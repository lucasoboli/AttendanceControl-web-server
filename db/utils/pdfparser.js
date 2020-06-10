
let fs = require('fs');
let PDFParser = require('pdf2json'); // Install pdf2json

let pdfParser = new PDFParser(this, 1);
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
