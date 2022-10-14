'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/get/:id', ProjectController.getProject);
router.get('/list', ProjectController.listAll);
router.put('/update/:id', ProjectController.update);
router.delete('/delete/:id', ProjectController.delete);
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;
