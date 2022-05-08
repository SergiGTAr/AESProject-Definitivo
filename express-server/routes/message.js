'use strict'


const express = require('express');

const MessageController = require('../controllers/message');

const api = express.Router();

const md_auth = require('../middlewares/checkAuth');


api.get('/proves-md', md_auth.ensureAuth, MessageController.provaMissatges);
api.post('/missatge', md_auth.ensureAuth, MessageController.guardarMissatge);
api.get('/missatgesrebuts/:page?', md_auth.ensureAuth, MessageController.missatgesRebuts);
api.get('/missatgesenviats/:page?', md_auth.ensureAuth, MessageController.missatgesEnviats);
api.get('/missatgesnollegits', md_auth.ensureAuth, MessageController.missatgesNoLlegits);
api.get('/llegirmissatges', md_auth.ensureAuth, MessageController.marcarMissatgesLlegits);

module.exports = api;