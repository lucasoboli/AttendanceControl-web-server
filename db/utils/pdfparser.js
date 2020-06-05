
let fs = require('fs');
let PDFParser = require('pdf2json');

// -> Run npm install --save pdf2json

let pdfParser = new PDFParser(this,1);
pdfParser.loadPDF('Listas/lista_ECOS02.pdf');


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
    
    //textData = textData.match(/.*?[a-zA-Z]+[0-9]+(?:\.[0-9]+|)/g);

    // Apenas para checar como está a saída em .txt
    fs.writeFile('students.txt', textData, function (err, result) {
        if (err) console.log('error', err);
    });


    // JSON

    // Converte para json
    jsonData = JSON.stringify(textData);

    // Remove tags de formatação do json
    jsonData = jsonData.replace(/\\r\\n/g, ' ');

    // Separa cada elemento alunomatricula com virgulas
    jsonData = jsonData.match(/.*?[a-zA-Z]+[0-9]+(?:\.[0-9]+|)/g);
    

    fs.writeFile('students.json', jsonData, function(err, result) {
        if (err) console.log('error', err);
    });

});
