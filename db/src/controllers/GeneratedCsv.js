const { ExportToCsv } = require('export-to-csv');
const Attendance = require('../models/Attendance');
const SubjectStudents = require('../models/SubjectStudents');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Professor = require('../models/Professor');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

module.exports = {
 
    async generateCsv(req, res){

        try {
            const subjects = await Attendance.findAll({ attributes: ['subject_id'], group: ['subject_id'], raw: true });

            // Percorre o array de disciplina
            subjects.map(generateSheet = async (sub) => {
                
                const all_students = await SubjectStudents.findAll({ 
                    attributes: ['student_id'],
                    group: ['student_id'],
                    raw: true,
                    where: { subject_id: sub.subject_id }
                });

                const present_stud = await Attendance.findAll({
                    attributes: ['student_id'],
                    group: ['student_id'],
                    raw: true,
                    where: {subject_id: sub.subject_id }
                });

                let datas = [];
        
                await Promise.all(all_students.map(getName = async (student) => {

                    const name_student = await Student.findAll({
                        attributes: ['id', 'name'],
                        raw: true,
                        where: { id: student.student_id }
                    });

                    name_student[0].present = 0;

                    datas.push(name_student[0]);
                }));

                datas.map(checkAttendance = async (data) => {
                    if(present_stud.some(student => student.student_id === data.id)){
                        data.present = 1;
                    }
                });

                const professor = await Subject.findOne({
                    attributes: ['professor_id'],
                    raw: true,
                    where: { id: sub.subject_id }
                });

                const email_prof = await Professor.findOne({
                    attributes: ['email'],
                    raw: true,
                    where: { id: professor.professor_id }
                });
        
                const options = { 
                    fieldSeparator: ';',
                    quoteStrings: '"',
                    decimalSeparator: '.',
                    showLabels: true, 
                    showTitle: true,
                    title: 'Planilha de Presença - UNIFEI',
                    useTextFile: false,
                    useBom: true,
                    useKeysAsHeaders: true,
                };

                const csvExporter = new ExportToCsv(options);

                const csvData = csvExporter.generateCsv(datas, true);
                fs.writeFileSync('data.csv',csvData);

                var transporte = nodemailer.createTransport({
                service: 'gmail', // Como mencionei, vamos usar o Gmail
                auth: {
                    user: 'controlpresence2020@gmail.com', // Basta dizer qual o nosso usuário
                    pass: 'presence2020'             // e a senha da nossa conta
                } 
                });

                var email = {
                    from: 'controlpresence2020@gmail.com', // Quem enviou este e-mail
                    to: email_prof.email, // Quem receberá
                    subject: 'Node.js ♥ unicode',  // Um assunto bacana :-) 
                    html: 'E-mail foi enviado do <strong>Node.js</strong>', // O conteúdo do e-mail,
                    attachments: [{ // Basta incluir esta chave e listar os anexos
                        filename: 'presenca.csv', // O nome que aparecerá nos anexos
                        path: path.resolve(__dirname, '..', '..', 'data.csv') // O arquivo será lido neste local ao ser enviado
                }]
                };
                console.log(email_prof);

                transporte.sendMail(email, function(err, info){
                if(err)
                    throw err; // Oops, algo de errado aconteceu.

                console.log('Email enviado! Leia as informações adicionais: ', info);
                });


                return res.status(200).json({ message: "E-mail sent successfully!" });
            });
        }catch(err) {
            return res.status(400).json({ message: "Error sending the e-mail." })
        }
    }
};
