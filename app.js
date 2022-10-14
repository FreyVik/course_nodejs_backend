'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Archivos de rutas
var project_routes = require('./routes/project');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Rutas
app.use('/project', project_routes);

// Exportar
module.exports = app;
