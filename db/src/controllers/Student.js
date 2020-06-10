const Student = require('../models/Student');

module.exports = {

    // Retorna todas os estudantes 
    async index(req, res){
        const student = await Student.findAll();
         
        return res.json(student);
    },

    // Cadastra um novo aluno
    async create(req, res){
        
        let fs = require('fs');
        let PDFParser = require('pdf2json'); // Install pdf2json

        let pdfParser = new PDFParser(this, 1);
        pdfParser.loadPDF('../../src/utils/Lista/lista_ECOS02.pdf');


        pdfParser.on('pdfParser_dataError', errData => console.error(errData.parseError));
        pdfParser.on('pdfParser_dataReady', pdfData => {


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
            fs.writeFile('students.txt', textData, function (err, result) {
                if (err) console.log('error', err);
            });
            
        

            let students = [];

            fs.readFile('students.txt', 'utf-8', function(err, data){
                var linha = data.split(/\r?\n/);

                linha.forEach(function(linha) {

                    var student = new Object();
                    student.name = linha.replace(/[0-9]+/g, '  ').trim();
                    student.id = parseInt(linha.split(/[a-z]+/i).pop().trim());

                    students.push(student);
                });

                console.log(students);
            });

        });
    }, 

    // Retorna um aluno específico
    async search(req, res){
        const { id } = req.params;

        try{
            const student = await Student.findByPk(id);
            return res.status(200).json(student);
        }catch(error){
            return res.status(404).json({message: "Aluno não encontrado"});
        }

    },

    // Edita os dados de um aluno
    async edit(req, res){
    
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
