"use strict";
const bcrypt = require("bcrypt-nodejs");

const User = require("../models/user");

function home(req, res) {
  res.status(200).send({
    message: "Servidor de NodeJS diu: hola",
  });
}

function proves(req, res) {
  console.log(req.body);
  res.status(200).send({
    message: "Servidor de NodeJS proves",
  });
}

function saveUser(req, res) {
  const params = req.body;
  const user = new User();

  if (
    params.name &&
    params.surname &&
    params.nick &&
    params.email &&
    params.password
  ) {
    user.name = params.name;
    user.surname = params.surname;
    user.nick = params.nick;
    user.email = params.email;
    user.role = "ROL_USUARI";
    user.image = null;

    //* Controlem usuaris duplicats

    User.find({ $or: [
        { email: user.email.toLowerCase() }, {nick: user.nick.toLowerCase()}
    ]}).exec((err, users) => {
        if (err) return res.status(500).send({ message: "Error al buscar usuaris existents" });
        if (users && users.length > 0){
            return res.status(200).send({message: "Aquest usuari ja existeix a la base de dades"})
        } else{
                //* Encriptem la contrasenya i guardem les dades
            bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;
          
                user.save((err, userStored) => {
                  if (err) {
                    return res.status(500).send({ message: "Error al guardar l'usuari" });
                  }
                  if (userStored) {
                    res.status(200).send({ user: userStored });
                  } else {
                    res.status(404).send({ message: "L'usuari no s'ha pogut registrar" });
                  }
                });
              });
        }
    });




  } else {
    res.status(200).send({
      message: "Has d'emplenar les dades requerides",
    });
  }
}

function loginUser(req, res){
  const params = req.body;

  const email = params.email;
  const password = params.password;


  User.findOne({ email: email, password: password }, (err, user) => {
    if(err) return res.status(500).send({ message: "Error en la petició"})

    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if(check){
          return res.status(200).send({user})
        }else{
          return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD'})
        }
      })
    }else{
      return res.status(404).send(404).send({ message: "Aquest usuari no existeix a la BBDD"})
    }
  })
}

module.exports = {
  home,
  proves,
  saveUser,
  loginUser
};
