const passport = require("passport");
const bcrypt = require('bcrypt');
const { ExtractJwt, Strategy } = require("passport-jwt");
const Professor = require('../models/Professor');
const cfg = require('../config/database');
const jwt = require("jwt-simple");

module.exports = {

    // Gera o token de acesso
    async token(req, res){
        if (req.body.email && req.body.password){
        const email	= req.body.email;
        const password = req.body.password;
        Professor.findOne({where: {email: email}})
            .then(user => {
                if(Professor.isPassword(user.password, password)){

                    const payload = {
                        id: user.id
                    };

                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret)
                    });
                
                }else{
                    res.sendStatus(401);
                }
            })
            .catch(err=>res.sendStatus(401));
        }else{
            res.sendStatus(401);
        }
    },

    // Faz a autenticação
    // Recebe o token e faz a verificação se é válido
    auth(){
        try {
        const params = {
            secretOrKey: "Nta$K-AP1",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        const strategy = new Strategy(params, async (payload, done) => {

            const userExistAlready = await Professor.findByPk(payload.id);
            // Se for, ele retorna o id e email do professor para ser utilizado nas outras rotas
            if (userExistAlready) {
                return done(null, {
                    id: userExistAlready.id,
                    email: userExistAlready.email
                });
            }

            return done(null, false);

        });
        passport.use(strategy);

        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate("jwt", { session: false })
        };

        }catch(err) {
            return res.status(401).json({message: "error"});
        }
    },     

    async encrypt(req, res){
        try{
            const salt = bcrypt.genSaltSync();
            encryptPassword = { password: bcrypt.hashSync(req.body.password, salt) };
            return res.status(200).json(encryptPassword);
        }catch(err){
            return res.status(400).json({message: "error"});
        }
    },
};