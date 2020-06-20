const multer = require("multer");
const path = require ("path");
const crypto = require ("crypto");

var number = 0;

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "utils", "Listas"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "utils", "Listas"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {// Para arquivos inseridos pelos professores não darem overwrite caso possuam o mesmo nome
                if (err) cb(err);

                //const fileName = `${hash.toString("hex")}-${file.originalname}`;
                const fileName = `${"lista"}-${number}${".pdf"}`;
                //++number;

                cb(null, fileName);
            });
        },
    }),
    limits: {//   2    KB     MB => 5MB
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "application/pdf",
            "application/PDF",
            "application/.pdf",
            "application/.PDF",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo inválido de arquivo"));
        }
    }
};