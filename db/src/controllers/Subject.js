const Subject = require('../models/Subject');
const Professor = require('../models/Professor');
const Student = require('../models/Student')

module.exports = {

    // Retorna todas as disciplinas
    async index(req, res){
        const subject = await Subject.findAll();

        return res.json(subject);
    },

    // Cria uma nova disciplina
    async create(req, res){
        
        const { professor_id } = req.params;
        const { code_subject, name, code_class, code_time } = req.body;

        try{

            const prof = await Professor.findByPk(professor_id);

            if(!prof)
                return res.status(400).json({message: "Professor não encontrado."});

            const subject = await Subject.create({ code_subject, name, code_class, code_time, professor_id });
            return res.status(201).json(subject);
        }catch(err){
            return res.status(400).json({message: "Dados da disciplina inválidos."});
        }

    }, 

    // Retorna uma disciplina específica
    async search(req, res){
        const { id } = req.params;

        try{
            const subject = await Subject.findByPk(id);
            return res.status(200).json(subject);
        }catch(error){
            return res.status(404).json({message: "Disciplina não encontrada"});
        }

    },

    // Edita uma disciplina
    async edit(req, res){
    
        const { id } = req.params;
        const subject = await Subject.findByPk(id);

        subject.code_subject = req.body.code_subject;
        subject.name = req.body.name;
        subject.code_class = req.body.code_class;
        subject.code_time = req.body.code_time;

        if (subject.code_subject === "" || subject.name === "" || subject.code_class === "" || subject.code_time === "")
            return res.status(400).json({message: "Os dados não podem estar em branco."});

        else{
            try{
                await subject.save();
                return res.status(200)
                    .json(subject);

            }catch(error){
                return res.status(400).json({message: "Erro ao editar disciplina."});
            }
      }
    },

    // Delete uma disciplina
    async delete(req, res){

        const {id} = req.params;
        const subject = await Subject.findByPk(id);

        try{
            await subject.destroy();
            return res.status(200).json({message: "Disciplina excluída com sucesso."});
        }catch(error){
            return res.status(404).json({message: "Disciplina não encontrada."});
        }

    },

    // Associa um estudante a uma disciplina
    async associateSubjectStudent(req, res){
        const { subject_id, student_id } = req.body;

        try{
            const subject = await Subject.findByPk(subject_id);
            const student = await Student.findByPk(student_id);
    
            if(subject == null || student == null)
                return res.status(400).json({ message: "Disciplina ou aluno não encontrados." });
            
            await subject.addStudent(student);
    
            return res.status(201)
                .json(subject);
    
        }catch(err){
            return res.status(400).json({ message: "Disciplina ou aluno não encontrados." });
        }
    },

};
