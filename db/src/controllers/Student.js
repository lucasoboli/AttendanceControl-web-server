const Student = require('../models/Student');
const fs = require('fs');
const PDFParser = require('pdf2json'); // Install pdf2json
const path = require('path');

module.exports = {

    // Retorna todas os estudantes 
    async index(req, res) {
        const student = await Student.findAll();
         
        return res.json(student);
    },

    // Cadastra um novo aluno
    async create(req, res) {

        //console.log(req.body)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(req.headers)
        
        try {
            let pdfParser = new PDFParser(this, 1);
            
            pdfParser.loadPDF(path.resolve(__dirname, '..', '..', 'utils', 'Listas', 'lista-0.pdf'));

            pdfParser.on('pdfParser_dataError', errData => console.error(errData.parseError));
            pdfParser.on('pdfParser_dataReady', async (pdfData) => {
                // TEXT
                // Pega dados a partir do cabeçalho
                textData = pdfParser.getRawTextContent().split("NOMEMATRICULAASSINATURA").pop();
                
                // Padroniza nomes para maiúsculo e remove espaços laterais
                textData = textData.toUpperCase().trim();

                // Remove page count e page break
                textData = textData.replace(/página[0-9]de[0-9]/gi, '');
                textData = textData.replace(/-+page \([0-9]\) break.*/gi, '');

                // Separa com ' ' nome de matrícula
                textData = textData.replace(/[^0-9](?=[0-9])/g, '$& ');

                // Apenas para checar como está a saída em .txt
                fs.writeFile('students.txt', textData, async (err, result) => {
                    await (err) ? console.log('error', err) : '';
                });

                fs.readFile('students.txt', 'utf-8', async (err, data) => {
                    var linha = data.split(/\r?\n/);
                    linha.forEach(async(linha) => {
                        name = linha.replace(/[0-9]+/g, '  ').trim();
                        id = parseInt(linha.split(/[a-z]+/i).pop().trim());

                        await Student.create({ id, name, phone: '99999999' });
                    });

                    return res.status(201).json({ message: "Cadastro realizado com sucesso!" });
                });

            });
        }catch(err) {
            console.log(err);
            return res.status(400).json({ message: "Erro ao cadastrar alunos, tente novamente." });
        }
    }, 

    // Retorna um aluno específico
    async search(req, res) {
        const { id } = req.params;

        try{
            const student = await Student.findByPk(id);
            return res.status(200).json(student);
        }catch(error){
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

    },

    // Edita os dados de um aluno
    async edit(req, res) {
    
        const { id } = req.params;
        const student = await Student.findByPk(id);

        student.id = req.body.id;
        student.name = req.body.name;
        student.phone = req.body.phone;


        if (student.id === "" || student.name === "" || student.phone === "")
            return res.status(400).json({message: "Os dados não podem estar em branco."});

        else{
            try{
                await student.save();
                return res.status(200)
                    .json(student);

            }catch(error){
                return res.status(400).json({message: "Erro ao editar os dados do aluno."});
            }
      }
    },

    // Delete um professor
    async delete(req, res){

        const {id} = req.params;
        const student = await Student.findByPk(id);

        try{
            await student.destroy();
            return res.status(200).json({message: "Aluno excluído com sucesso."});
        }catch(error){
            return res.status(404).json({message: "Aluno não encontrado."});
        }

    },

};
