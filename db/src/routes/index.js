const Professor = require('../controllers/Professor');
const Subject = require('../controllers/Subject');
const QRCode = require('../controllers/QRCode');
const Student = require('../controllers/Student');
const ExportCsv = require('../controllers/GeneratedCsv');
const multer = require("multer");
const multerConfig = require("../config/multer");

const upload = multer();


const { token, auth, encrypt } = require('../controllers/Authentication');

module.exports = (app) => {

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
        .post(multer(multerConfig).single("file"), Student.create)
    
    app
        .route('/student/:id')
        .get(Student.search)
        .put(Student.edit)
        .delete(Student.delete)

    app
        .route('/subject_students')
        .post(Subject.associateSubjectStudent)

    app
        .route('/authentification')
        .post(QRCode.authentification)
    
    app
        .route('/qrcode')
        .post(QRCode.qrCode)

    app
        .route('/presence')
        .post(QRCode.presence)

    app
        .route('/attendance')
        .get(ExportCsv.generateCsv)

};
