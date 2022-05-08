'use strict'

const moment = require('moment');


const mongoosePaginate = require('mongoose-paginate-v2');


const User = require('../models/user');


const Follow = require('../models/follow');


const Message = require('../models/message');


function provaMissatges(req, res) {
    res.status(200).send({message: 'Proves de missatge'});
}

function guardarMissatge(req, res) {
    const params = req.body;
    const message = new Message();
    message.recipient = params.recipient;
    message.sender = params.sender;
    message.text = params.text;
    message.viewed = 'false';
    message.created_at = moment().unix();
    message.save((err, messageStored) => {
        if (err) {
            res.status(500).send({message: 'Error al guardar el missatge'});
        } else {
            if (!messageStored) {
                res.status(404).send({message: 'No s\'ha guardat el missatge'});
            } else {
                res.status(200).send({message: messageStored});
            }
        }
    });
}


function missatgesRebuts(req, res) {
    const userId = req.user.sub;

    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    const itemsPerPage = 4;


    Message.find({recipient: userId}).sort('-created_at').populate('sender', 'name surname image _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) {
            res.status(500).send({message: 'Error al obtenir els missatges rebuts'});
        } else {
            if (!messages) {
                res.status(404).send({message: 'No hi ha missatges rebuts'});
            } else {
                res.status(200).send({
                    total: this.total,
                    pages: Math.ceil(this.total / itemsPerPage),
                    messages: messages
                });
            }
        }
    });
}

function missatgesEnviats(req, res) {
    const userId = req.user.sub;

    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    const itemsPerPage = 4;


    Message.find({sender: userId}).sort('-created_at').populate('recipient', 'name surname image _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) {
            res.status(500).send({message: 'Error al obtenir els missatges enviats'});
        } else {
            if (!messages) {
                res.status(404).send({message: 'No hi ha missatges enviats'});
            } else {
                res.status(200).send({
                    total: this.total,
                    pages: Math.ceil(this.total / itemsPerPage),
                    messages: messages
                });
            }
        }
    });
}

function missatgesNoLlegits(req, res) {
    const userId = req.user.sub;

    Message.find({
        recipient: userId,
        viewed: 'false'
    }).sort('-created_at').populate('sender', 'name surname image _id').exec((err, messages) => {
        if (err) {
            res.status(500).send({message: 'Error al obtenir els missatges no llegits'});
        } else {
            if (!messages) {
                res.status(404).send({message: 'No hi ha missatges no llegits'});
            } else {
                res.status(200).send({messages});
            }
        }
    });
}

function marcarMissatgesLlegits(req, res) {
    const userId = req.user.sub;
    const messageId = req.params.id;

    Message.find({
        recipient: userId,
        viewed: 'false'
    }).sort('-created_at').populate('sender', 'name surname image _id').exec((err, messages) => {
        if (err) {
            res.status(500).send({message: 'Error al obtenir els missatges no llegits'});
        } else {
            if (!messages) {
                res.status(404).send({message: 'No hi ha missatges no llegits'});
            } else {
                messages.forEach(message => {
                    message.viewed = 'true';
                    message.save();

                });
            }
        }
    });

    module.exports = {
        provaMissatges,
        guardarMissatge,
        missatgesRebuts,
        missatgesEnviats,
        missatgesNoLlegits,
        marcarMissatgesLlegits
    }
}