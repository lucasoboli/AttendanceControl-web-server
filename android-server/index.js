//npm i -y
//npm install express --save
//npm install body-parser --save
//npm install qr-image --save
//npm install crypto-js --save
//npm install parse-json --save

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const qr = require('qr-image');


app.listen(8080, () => {
    console.log("Server running on port 8080");
});

app.use(bodyParser.json());

//Url that receive the number of phone
app.post('/authentification', function (req, res, next) {

    let { numberPhone } = req.body;

    console.log(numberPhone);

    /**********************************************************************************************
     TO-DO
     //req.body = { numberPhone: '+5535979999887' }
     //numberPhone = 359998859201

     Pegar no banco a matricula do aluno vinculada ao número de celular que está na numberPhone

     | ID | MATRICULA | NUM_CELULAR|
     | 1  | 34191     | 3598859201 |
     | 2  | 34199     | 3598859202 |
     | 3  | 34324     | 3598859203 |
     | 4  | 33398     | 3598859204 |
     | 5  | 22588     | 3598859205 |

     Retornar a matricula e colocar na variavel registration
    **********************************************************************************************/

    const registration = "34191";

    //montar um json de retorno com a matricula

    let responseAuth = req.body;
    responseAuth.registration = registration;

    // responseAuth = { numberPhone: '+5576676767677', registration: '34191' }

    res.json(responseAuth)
})

//----------------------------------------------------------------------------------------------------
// UnixTime NTP através da API Fonte: http://worldtimeapi.org/
//----------------------------------------------------------------------------------------------------

const request = require('request');
const hostname = `http://worldtimeapi.org/api/timezone/America`;
const path = `/Cuiaba`;
request(`${hostname}${path}`, (err, res, body) => {
    let {unixtime} = JSON.parse(res.body);
   console.log(unixtime);

/*
    TO-DO
    somar + 10s no unixtime 

*/

//----------------------------------------------------------------------------------------------------
// Construindo a Url de dados para o QrCode
//----------------------------------------------------------------------------------------------------

/*
    TO-DO
    Pegar o initials e o class do banco 
*/

    url = `{'initials': 'eco', 'class': 't1', 'unixTime': ${unixtime}}`;

//----------------------------------------------------------------------------------------------------
// Encriptando a url para o QrCode
//----------------------------------------------------------------------------------------------------

    var crypto = require('crypto')
    var password = "universidade-federal-de-itajuba-2020";
    var cipher = crypto.createCipher('aes-128-ecb', password)
    var text = "the big brown fox jumped over the fence"
    var crypted = cipher.update(url, 'utf-8', 'hex')
    crypted += cipher.final('hex')

    console.log(crypted);
//now crypted contains the hex representation of the ciphertext

//----------------------------------------------------------------------------------------------------
//Gerador de QR code no formato de imagem
//----------------------------------------------------------------------------------------------------
    app.set('view engine', 'ejs');
    app.get('/qr', (req, res) => res.render('home'))

    app.get('/qrcode', (req, res) => {
        const code = qr.image(crypted, {type: 'png'})
        res.type('png')
        code.pipe(res)
    })

    //Para ver o qrCode localhost:8080/qrCode
});

/*****************************************************************************************************
 * TO-DO
 * celular vai enviar um json:
 * {'initials': 'eco', 'class': 't1', 'unixTime': unixTime, 'Registration' : '34191' }
 *
 * usar essas dados para dar a presença ao aluno
 *
 */
app.post('/presence', function (req, res, next) {

    //req.body = {'initials': 'eco', 'class': 't1', 'unixTime': unixTime, 'Registration' : '34191' }
    console.log(req.body);
    res.status(200);

});
