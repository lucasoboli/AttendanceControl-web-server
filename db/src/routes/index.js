const Professor = require('../controllers/Professor');
const Subject = require('../controllers/Subject');
const Student = require('../controllers/Student');
const StudentModel = require('../models/Student');
const SubjectModel = require('../models/Subject');


const { token, auth, encrypt } = require('../controllers/Authentication');


const { getTime } = require('../../utils/time');
const { qrgen } = require('../../utils/qrCode');

module.exports = (app) => {

    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    app
        .route('/login')
        .post(token)

    app
        .route('/encrypt')
        .put(encrypt)

    app
        .route('/professor')
        .get(Professor.index)
        .post(Professor.create)

    app
        .route('/professor/:id')
        .get(Professor.search)
        .put(Professor.edit)
        .delete(Professor.delete)

    app
        .route('/professor/:id/password')
        .put(Professor.changePassword)
    app
        .route('/subject')
        .get(Subject.index)

    app
        .route('/professor/:professor_id/subject/')
        .post(Subject.create)
    
    app
        .route('/subject/:id')
        .get(Subject.search)
        .put(Subject.edit)
        .delete(Subject.delete)

    app
        .route('/student')
        .get(Student.index)
        .post(Student.create)
    
    app
        .route('/student/:id')
        .get(Student.search)
        .put(Student.edit)
        .delete(Student.delete)

    app
        .route('/subject_students')
        .post(Subject.associateSubjectStudent)


    app
        .post('/authentification', function (req, res, next) {
        let responseAuth = req.body;
        let {numberPhone} = req.body;
        console.log(numberPhone);

        student = StudentModel.findOne({where: {phone: numberPhone}})

        responseAuth.registration = student.id;
        res.json(responseAuth)
    })

    app.post('/qrcode', function (req, res) {
        // res.sendFile(__dirname + '/index.html');


        async function qrCode() {
            try {
                //Horário utc do servidor
                const unixtime = await getTime(`http://worldtimeapi.org/api/timezone/America/Cuiaba`);
                const _rangeUnixtime = unixtime + 15;
                /**********************************************************************************************
                 TO-DO: Buscar no banco as informações de _acronyms e _class (infos da aula)
                 **********************************************************************************************/

                const _acronyms = req.body.acronyms;
                const _class = req.body.class;

                //token do QrCode 
                const token = `{'_acronyms': ${_acronyms}, '_class': ${_class}, 'unixTime': ${_rangeUnixtime}}`;
                console.log(token)
                //criptografia do token
                var crypto = require('crypto')
                var password = "universidade-federal-de-itajuba-2020";
                var cipher = crypto.createCipher('aes-128-ecb', password)
                var text = "the big brown fox jumped over the fence"
                var crypted = cipher.update(token, 'utf-8', 'hex')
                crypted += cipher.final('hex')
        
                //gerando a url com a respectiva imagem do qr code com o token acima
                qrgen(`${crypted}`).then(data => {
                    console.log(data)
                    res.json({data: data});
                }).catch(error => {
                    console.log(error);
                });
        
            } catch (e) {
                throw e;
            }
        }
        
        // setInterval(async () => {
            qrCode();
        // }, 15000);

    });

    // app.post('/presence', function (req, res, next) {

    //     console.log(req.body);
    //     /*****************************************************************************************************
    //      * TO-DO
    //      * - a requisição:
    //      {
    //                         _acronyms: 'eco',
    //                         _class: 't1',
    //                         unixTimeQr: '1590368807',
    //                         unixTimeApp: '1590368797',
    //                         registration: '34191'
    //                     }
    
    //      * - usar a requisição acima  para efetuar a presença do aluno
    //      *****************************************************************************************************/
    //     response = {code: 200};
    //     //envia o json com código 200 de sucesso
    //     res.json(response);
    // });
    

};