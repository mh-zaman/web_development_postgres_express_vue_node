const express = require('express');
const app = express();

require("express-async-errors");
const cors = require('cors');

const handleErrors = require('./middleware/error');
const routes = require('./routes/index.routes');

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.json());

app.use('/', routes);

app.use(handleErrors);

module.exports = app;