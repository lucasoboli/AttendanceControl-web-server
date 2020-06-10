const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

/*** Models ***/

const Professor = require('../models/Professor');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const SubjectStudents = require('../models/SubjectStudents');

const connection = new Sequelize(dbConfig);

/*** Connect Model ***/

Professor.init(connection);
Subject.init(connection);
Student.init(connection);
Attendance.init(connection);
SubjectStudents.init(connection);

/*** Associate Models ***/

Subject.associate(connection.models);
Student.associate(connection.models);

module.exports = connection;
