'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Archivos de rutas

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Rutas
app.get('/', (req, res) => {
	res.status(200).send('<h1>Working...</h1>');
});

app.get('/test', (req, res) => {
	res.status(200).send({
		message: 'API NodeJS',
	});
});

// Exportar
module.exports = app;
