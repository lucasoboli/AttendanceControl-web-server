const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

/*** Models ***/

const Professor = require('../models/Professor');
const Subject = require('../models/Subject');
const Student = require('../models/Student');

const connection = new Sequelize(dbConfig);

/*** Connect Model ***/

Professor.init(connection);
Subject.init(connection);
Student.init(connection);

/*** Associate Models ***/

Subject.associate(connection.models);

module.exports = connection;