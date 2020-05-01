const Student = require('../models/Student');

module.exports = {

    // Retorna todas os estudantes 
    async index(req, res){
        const student = await Student.findAll();
         
        return res.json(student);
    },

    // Cadastra um novo alunno
    async create(req, res){
        
        const { id, name, phone } = req.body;

        try{
            const student = await Student.create({ id, name, phone });
            return res.status(201).json(student);
        }catch(err){
            return res.status(400).json({message: "Aluno já cadastrado."});
        }

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
