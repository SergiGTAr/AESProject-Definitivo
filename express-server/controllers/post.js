"use strict";
const User = require("../models/post");
const bcrypt = require("bcrypt-nodejs");

function home(req, res) {
    res.status(200).send({
        message: "Servidor de NodeJS diu: hola",
    });
}

function savePost(req, res) {
    const params = req.body;
    const post = new post();

    if (
        params.content &&
        params.user &&
        params.category
    ) {
        post.content = params.name;
        post.user = params.surname;
        post.created_at = getTime();
        post.image = null;
        post.likes = 0;
        post.category = params.category;

        //* Controlem usuaris duplicats

        User.find({
            $or: [
                {email: user.email.toLowerCase()}, {username: user.username.toLowerCase()}
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({message: "Error al buscar usuaris existents"});
            if (users && users.length > 0) {
                return res.status(200).send({message: "Aquest usuari ja existeix a la base de dades"})
            } else {
                //* Encriptem la contrasenya i guardem les dades
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) {
                            return res.status(500).send({message: "Error al guardar l'usuari"});
                        }
                        if (userStored) {
                            res.status(200).send({user: userStored});
                        } else {
                            res.status(404).send({message: "L'usuari no s'ha pogut registrar"});
                        }
                    });
                });
            }
        });


    } else {
        res.status(200).send({
            message: "Has d'emplenar les dades requerides: " + params.name + params.surname + params.sex + params.username + params.email + params.password,
        });
    }
}

function loginUser(req, res) {
    const params = req.body;

    const email = params.email;
    const password = params.password;


    User.findOne({email: email, password: password}, (err, user) => {
        if (err) return res.status(500).send({message: "Error en la petició"})

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        //Generem i retornem el token si al body de la petició ens envien "gettoken = true"
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        //Retornem les dades de l'usuari si no està el gettoken a true
                        user.password = undefined;
                        return res.status(200).send({user})
                    }
                } else {
                    return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD'})
                }
            })
        } else {
            return res.status(404).send(404).send({message: "Aquest usuari no existeix a la BBDD"})
        }
    })
}


function getAllUsers(req, res) {
    User.find({}, function (err, users) {
        return res.status(200).send({users})
    });
}


function getUserById(req, res) {
    const params = req.body;
    const userId = params._id;

    User.findOne({_id: userId}, (err, user) => {
        if (err) return res.status(500).send({message: "Error en la petició"})

        if (user) {
            return res.status(200).send({user})
        } else {
            return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD'})
        }
    })
}

function getUserByUsername(req, res) {
    const params = req.body;
    const userName = params.surname;

    User.findOne({id: userName}, (err, user) => {
        if (err) return res.status(500).send({message: "Error en la petició"})

        if (user) {
            return res.status(200).send({user})
        } else {
            return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD'})
        }
    })
}

function updateUser(req, res) {
    const params = req.body;
    const userId = params.id;

    const userName = params.name;
    const userSurname = params.surname;
    const userUsername = params.username;
    const userEmail = params.email;
    const userRole = params.role;
    const userImage = params.image;
    const update = {
        name: userName,
        surname: userSurname,
        username: userUsername,
        email: userEmail,
        role: userRole,
        image: userImage
    };

    User.findOneAndUpdate({id: userId}, update, "", function (err, user) {
        if (err) {
            console.log("No s'ha pogut actualitzar!");
        } else {
            console.log(user);
        }
    });
}

function deleteUser(req, res) {
    const params = req.body;
    const userId = params.id;

    User.findOneAndDelete({id: userId});
    User.findById(userId, function (err, user) {
        if (err) {
            console.log("El usuari s'ha eliminat correctament!");
        } else {
            console.log("No s'ha pogut eliminar l'usuari!")
            console.log(user);
        }
    });

}

module.exports = {
    home,
};