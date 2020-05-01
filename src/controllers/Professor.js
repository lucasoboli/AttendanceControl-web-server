const Professor = require('../models/Professor');

module.exports = {

    // Retorna todas os professores
    async index(req, res){
        const prof = await Professor.findAll();

        return res.json(prof);
    },

    // Cadastra um novo professor
    async create(req, res){
        
        const { name, email, password } = req.body;

        try{
            const prof = await Professor.create({ name, email, password });
            return res.status(201).json(prof);
        }catch(err){
            return res.status(400).json({message: "Email já cadastrado."});
        }

    }, 

    // Retorna um professor específico
    async search(req, res){
        const { id } = req.params;

        try{
            const prof = await Professor.findByPk(id);
            return res.status(200).json(prof);
        }catch(error){
            return res.status(404).json({message: "Professor não encontrado"});
        }

    },

    // Edita os dados de um professor
    async edit(req, res){
    
        const { id } = req.params;
        const prof = await Professor.findByPk(id);

        prof.name = req.body.name;
        prof.email = req.body.email;
        prof.password = req.body.password;


        if (prof.name === "" || prof.email === "" || prof.password === "")
            return res.status(400).json({message: "Os dados não podem estar em branco."});

        else{
            try{
                await prof.save();
                return res.status(200)
                    .json(prof);

            }catch(error){
                return res.status(400).json({message: "Erro ao editar os dados do professor."});
            }
      }
    },

    // Delete um professor
    async delete(req, res){

        const {id} = req.params;
        const prof = await Professor.findByPk(id);

        try{
            await prof.destroy();
            return res.status(200).json({message: "Professor excluído com sucesso."});
        }catch(error){
            return res.status(404).json({message: "Professor não encontrado."});
        }

    },

};
