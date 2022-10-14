'use strict';

var Project = require('../models/project');

var controller = {
	home: function (req, res) {
		return res.status(200).send({
			message: 'Soy la home',
		});
	},

	test: function (req, res) {
		return res.status(200).send({
			message: 'Soy el metodo de test',
		});
	},

	saveProject: function (req, res) {
		var project = new Project();

		project.save((err, projectStored) => {
			if (err)
				return res.status(500).send({
					message: 'Errpr al guardar',
				});

			if (!projectStored)
				return res.status(404).send({
					message: 'No se ha podido guardar el proyecto',
				});

			return res.status(200).send({
				project: projectStored,
			});
		});

		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		return res.status(200).send({
			project: project,
			message: 'Creando project',
		});
	},

	getProject: function (req, res) {
		var projectId = req.params.id;

		Project.findById(projectId, (err, project) => {
			if (err)
				return res.status(500).send({
					message: 'Error al recuperar el proyecto',
				});

			if (!project)
				return res.status(404).send({
					message: 'El project no existe',
				});

			return res.status(200).send({
				project: project,
			});
		});
	},

	listAll: function (req, res) {
		Project.find({})
			.sort('-year')
			.exec((err, projects) => {
				if (err)
					return res.status(500).send({
						message: 'Error al recuperar el listado de proyectos',
					});

				if (!projects)
					return res.status(404).send({
						message: 'La lista de proyectos esta vacia',
					});

				return res.status(200).send({ projects });
			});
	},

	update: function (req, res) {
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
			if (err)
				return res.status(500).send({
					message: 'Error al actualizar proyectos',
				});

			if (!projectUpdated)
				return res.status(404).send({
					message: 'No se ha actualizado el project',
				});

			return res.status(200).send({
				project: projectUpdated,
			});
		});
	},

	delete: function (req, res) {
		var projectId = req.params.id;

		Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
			if (err)
				return res.status(500).send({
					message: 'No se ha podido borrar el project',
				});

			if (!projectRemoved)
				return res.status(404).send({
					message: 'No se puede eliminar el project',
				});

			return res.status(200).send({
				project: projectRemoved,
			});
		});
	},

	uploadImage: function (req, res) {
		var projectId = req.params.id;
		var fileName = 'Imagen no subida';

		if (req.files) {
			var filePath = req.files.image.path;
			var fileSplit = filePath.splite('/');
			var fileName = fileSplit[1];

			Project.findByIdAndUpdate(projectId, { image: fileName }, (err, projectUpdated) => {
				if (err)
					return res.status(500).send({
						message: 'La imagen no se ha podido subir',
					});

				if (!projectUpdated)
					return res.status(404).send({
						message: 'El projecto no extiste',
					});

				return res.status(200).send({
					files: filesName,
				});
			});

			return res.status(200).send({
				files: req.files,
			});
		} else {
			return res.status(404).send({
				message: fileName,
			});
		}
	},
};

module.exports = controller;
