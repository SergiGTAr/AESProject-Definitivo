"use strict";
const User = require("../models/post");

function home(req, res) {
    res.status(200).send({
        message: "Servidor de NodeJS diu: hola",
    });
}


module.exports = {
    home,
};