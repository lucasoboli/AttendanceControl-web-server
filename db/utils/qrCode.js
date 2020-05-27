var qr = require('qrcode');
var imgur = require('imgur');

const qrgen = async function(url) {
    const qrurl = await qr.toDataURL(url, {
        'errorCorrectionLevel': 'M'
    })
     
    if (qrurl) {
        const image = await imgur.uploadBase64(qrurl.slice(22));
        return image.data.link;
    }

   
    return console.error('An error occured encoding the data to a QR code')
}
//   qrgen(`http://worldtimeapi.org/api/timezone/America/Cuiaba`).then(data => {
//         console.log(data);
//     }).catch(error => {
//         console.log(error);
//     });
module.exports = {qrgen};
 