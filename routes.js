const express = require('express');
const routes = express.Router();

const Auth = require('./app/middleware/authorization')
const ContactController = require('./app/controller/ContactController');
const LoginController   = require('./app/controller/LoginController');

routes.post('/system/init', LoginController.init);

routes.get('/contact/macapa',  Auth.verifyJWT, ContactController.listMacapa);
routes.post('/contact/macapa', Auth.verifyJWT, ContactController.saveMacapa);

routes.get('/contact/varejao',  Auth.verifyJWT, ContactController.listVarejao);
routes.post('/contact/varejao', Auth.verifyJWT, ContactController.saveVarejao);

routes.post('/login', LoginController.index);

module.exports = routes;