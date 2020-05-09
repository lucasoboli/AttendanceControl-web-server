const express = require('express');
const routes = require('./routes/index');
const { auth } = require('./controllers/Authentication')

require('./database');

const app = express();
app.use(auth().initialize());
app.use(express.json());
routes(app);

module.exports = app;
