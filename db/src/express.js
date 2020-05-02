const express = require('express');
const routes = require('./routes/index');
require('./database');

const app = express();
app.use(express.json());
routes(app);

module.exports = app;