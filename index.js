'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017/portfolio')
	.then(() => {
		console.log('Conexion a mongoDB establecida.');

		// Creacion del servidor
		app.listen(3700, () => {
			console.log('Servidor corriendo en localhost:3700');
		});
	})
	.catch(err => console.log(err));
