//npm i -y
//npm install express --save
//npm install crypto-js --save
//npm install body-parser --save

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const {getTime} = require('./utils/time');
const {qrgen} = require('./utils/qrCode');

//-----------------------------------------------------------------------------------------------------
// 1 - Rota para login do aplicativo
//-----------------------------------------------------------------------------------------------------

app.post('/authentification', function (req, res, next) {
    let responseAuth = req.body;
    let {numberPhone} = req.body;
    console.log(numberPhone);

    /**********************************************************************************************
     TO-DO
     //req.body = { numberPhone: '+5535979999887' }
     //numberPhone = 359998859201

     Buscar no banco a matricula do aluno vinculada ao número de celular que está na numberPhone

     | ID | MATRICULA | NUM_CELULAR|
     | 1  | 34191     | 3598859201 |
     | 2  | 34199     | 3598859202 |
     | 3  | 34324     | 3598859203 |
     | 4  | 33398     | 3598859204 |
     | 5  | 22588     | 3598859205 |

     Retornar a matricula e colocar na variavel registration
     **********************************************************************************************/

    const registration = "34191";
    responseAuth.registration = registration;
    // responseAuth = { numberPhone: '+5576676767677', registration: '34191'}
    res.json(responseAuth)
})

//-----------------------------------------------------------------------------------------------------
// 2 - Rota para qr Code na tela
//-----------------------------------------------------------------------------------------------------

app.get('/qrcode', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

async function qrCode() {
    try {
        //Horário utc do servidor
        const unixtime = await getTime(`http://worldtimeapi.org/api/timezone/America/Cuiaba`);
        const _rangeUnixtime = unixtime + 15;
        /**********************************************************************************************
         TO-DO: Buscar no banco as informações de _acronyms e _class (infos da aula)
         **********************************************************************************************/
        var _acronyms = 'eco';
        var _class = 't1';
        //token do QrCode 
        token = `{'_acronyms': ${_acronyms}, '_class': ${_class}, 'unixTime': ${_rangeUnixtime}}`;
        console.log(token);

        //criptografia do token 
        var crypto = require('crypto')
        var password = "universidade-federal-de-itajuba-2020";
        var cipher = crypto.createCipher('aes-128-ecb', password)
        var text = "the big brown fox jumped over the fence"
        var crypted = cipher.update(token, 'utf-8', 'hex')
        crypted += cipher.final('hex')

        //gerando a url com a respectiva imagem do qr code com o token acima
        qrgen(`${crypted}`).then(data => {
            console.log(data);
            io.emit('chat message', `${data}`);
        }).catch(error => {
            console.log(error);
        });

    } catch (e) {
        throw e;
    }
}

setInterval(async () => {
    qrCode();
}, 15000);

//-----------------------------------------------------------------------------------------------------
// 3 - Rota para qr Code na tela
//-----------------------------------------------------------------------------------------------------

app.post('/presence', function (req, res, next) {

    console.log(req.body);
    /*****************************************************************************************************
     * TO-DO
     * - a requisição:
     {
                        _acronyms: 'eco',
                        _class: 't1',
                        unixTimeQr: '1590368807',
                        unixTimeApp: '1590368797',
                        registration: '34191'
                    }

     * - usar a requisição acima  para efetuar a presença do aluno
     *****************************************************************************************************/
    response = {code: 200};
    //envia o json com código 200 de sucesso
    res.json(response);
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
