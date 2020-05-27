const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');

const { auth } = require('./controllers/Authentication')

require('./database');

const app = express();

app.use(auth().initialize());
app.use(express.json());
app.use(cors());
routes(app);

module.exports = app;
