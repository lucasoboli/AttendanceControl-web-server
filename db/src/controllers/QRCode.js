const Student = require('../models/Student');
const Subject = require('../models/Subject');

const { getTime } = require('../../utils/time');
const { qrgen } = require('../../utils/qrCode');

module.exports = {

    async qrCode(req, res){

        try {
            // Horário UTC do servidor
            const unixtime = await getTime(`http://worldtimeapi.org/api/timezone/America/Cuiaba`);
            const _rangeUnixtime = unixtime + 15;

            const _acronyms = req.body.acronyms;
            const _class = req.body.class;

            // Token do QRCode 
            const token = `{'_acronyms': ${_acronyms}, '_class': ${_class}, 'unixTime': ${_rangeUnixtime}}`;
            console.log(token)

            // Criptografia do token
            var crypto = require('crypto')
            var password = "universidade-federal-de-itajuba-2020";
            var cipher = crypto.createCipher('aes-128-ecb', password)
            var text = "the big brown fox jumped over the fence"
            var crypted = cipher.update(token, 'utf-8', 'hex')
            crypted += cipher.final('hex')
    
            // Gerando a url com a respectiva imagem do qr code com o token acima
            qrgen(`${crypted}`).then(data => {
                console.log(data)
                return res.status(200).json({data: data});
            }).catch(error => {
                return res.status(400)
            });
    
        } catch (e) {
            throw e;
        }
    },

    async authentification(req, res){

        const { numberPhone } = req.body;
        try{
            student = Student.findOne({ where: { phone: numberPhone } })

            const responseAuth = {
                registration: student.id
            }
    
            return res.status(200).json(responseAuth)
        } catch(err) {
            return res.status(400).json({message: "Aluno não encontrado"})
        }

    },

    async presence(req, res){

        const { _acronyms, _class, registration } = req.body;
        
        try {

            const subject = await Subject.findOne({ where: { code_subject: _acronyms, code_class: _class } });
            const student = await Student.findByPk(registration);

            if(!subject || !student)
                return res.status(400).json({message: "Disciplina ou aluno não encontrado"});

            await subject.addStudentPresent(student);

            return res.status(201)
                .json({ message: "Presença cadastrada com sucesso!" });

        }catch(err) {
            console.log(err)
            return res.status(400).json({message: "Erro ao cadastrar presença. Favor tentar novamente"});
        }

    },

};
