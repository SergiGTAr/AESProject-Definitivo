"use strict";

const bcrypt = require("bcrypt-nodejs");

const User = require("../models/user");

const jwt = require("../services/jwt");

const Post = require("../models/post");

const Follow = require("../models/follow");



function home(req, res) {
    res.status(200).send({
        message: "Servidor de NodeJS diu: hola",
    });
}

function proves(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: "Servidor de NodeJS proves 2",
    });
}

function saveUser(req, res) {
    const params = req.body;
    const user = new User();

    if (
        params.name &&
        params.surname &&
        params.sex &&
        params.username &&
        params.email &&
        params.password
    ) {
        user.name = params.name;
        user.surname = params.surname;
        user.sex = params.sex;
        user.username = params.username;
        user.email = params.email;
        user.role = "ROL_USUARI";
        user.image = null;

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


    User.findOne({email: email}, (err, user) => {
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
                    return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD 1'})
                }
            })
        } else {
            return res.status(404).send({message: "Aquest usuari no existeix a la BBDD 2"})
        }
    })
}


function getAllUsers(req, res) {
    User.find({}, function (err, users) {
        return res.status(200).send({users})
    });
}


function getUserById(req, res) {
    const userId = req.params.id;

    User.findOne({_id: userId}, (err, user) => {
        if (err) return res.status(500).send({message: "Error en la petició"})

        if (user) {
            return res.status(200).send({user})
        } else {
            return res.status(404).send({message: 'Aquest usuari no existeix a la BBDD'})
        }
    })
}

function getUserByUsername(req, res){
    const username = req.params.username;

    User.findOne({'username': username}, (err, user) => {
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

function updateNameSurname(req, res){
    const params = req.body;
    const userId = req.user.sub;

    const userName = params.user.name;
    const userSurname = params.user.surname;

    const filter = { _id : userId };
    //const update = { name : userName}{ surname : userSurname };

    User.updateOne(
        filter,
        { $set: { name: userName, surname: userSurname } },
        function(err, user) {
            if (err) {
                res.status(404).send({message: "No s'ha actualitzat"});
            } else {
                res.status(200).send(user);
            }
        }
    );
}

function updatePassword(req, res){
    const params = req.body;
    const userId = req.user.sub;

    let userPassword = params.password;

    bcrypt.hash(params.password, null, null, (err, hash) => {
        userPassword = hash;
    });

    const filter = { _id : userId };
    const update = { password : userPassword};

    User.updateOne(
        filter,
        update,
        function(err, user) {
            if (err) {
                res.status(404).send({message: "No s'ha actualitzat"});
            } else {
                res.status(200).send(user);
            }
        }
    );
}

function updateBioBirth(req, res){
    const params = req.body;
    const userId = req.user.sub;

    const userBio = params.user.bio;
    const userBirth = params.user.birth;

    const filter = { _id : userId };
    //const update = { name : userName}{ surname : userSurname };

    User.updateOne(
        filter,
        { $set: { bio: userBio, birth: userBirth } },
        function(err, user) {
            if (err) {
                res.status(404).send({message: "No s'ha actualitzat"});
            } else {
                res.status(200).send(user);
            }
        }
    );
}

function deleteUser(req, res) {
    const params = req.body;
    const userId = params.id;

    User.deleteOne({ "_id" : userId});
    User.findById(userId, function (err, user) {
        if (err) {
            console.log("El usuari s'ha eliminat correctament!");
        } else {
            console.log("No s'ha pogut eliminar l'usuari!")
            console.log(user);
        }
    });

}

function getCounters(req, res) {
    let userId = req.user.sub;

    if (req.params.id){
        userId = req.params.id;
    }

    getCountFollow(userId).then((value) => {
        return res.status(200).send({value})
    })

    async function getCountFollow(userId) {
        const following = await Follow.count({"user": userId}).exec((err, count) => {
            if (err) return res.status(500).send({message: "Error en la petició"})
            return count
        })

        const followed = await Follow.count({"followed": userId}).exec((err, count) => {
            if (err) return res.status(500).send({message: "Error en la petició"})
            return count
        })


        const posts = await Post.count({"user": userId}).exec((err, count) => {
            if (err) return res.status(500).send({message: "Error en la petició"})
            return count
        })

        return {
            following: following,
            followed: followed,
            posts: posts
        }
    }
}

function newfollow(req, res){
    let user_id = req.user.sub;
    let following_id = req.body.id;

    User.updateOne(
        { _id: user_id },
        { $addToSet: { following: [following_id] } },
        function(err, user) {
            if (err) {
                res.status(404).send({message: "No s'ha actualitzat"});
            } else {
                res.status(200).send(user);
            }
        }
    );
}

function followers_count(req, res){
    let user_id = req.user.sub;

    //const db = MongoClient.db("AESProjectDB");

    /*var o = {};
    o.map = function () {emit(this.following, 1)};*/




    /*let mapFunction = function(){
        emit(this.following, 1);
    };

    let reduceFunction = function(k,following) {
        let count = 0;
        for(var i in following){
            if(following[i] == user_id) count += 1;
        }
        return count;
    };

    mongoose.connection.getClient().db().mapReduce(
        mapFunction,
        reduceFunction,

    );

    console.log("OK")*/

    //db.number_of_followers.find()



    /*const o = {};
    // You can also define `map()` and `reduce()` as strings if your
    // linter complains about `emit()` not being defined
    o.map ='function () { emit(this.name, this.following.length) }';
    o.reduce ='function (k, vals) { return vals.length }';
    o.out = { replace:'createdCollectionNameForResults'};
    o.verbose = true;
    User.mapReduce(o,function(err, model, stats){
        model.find().exec(function(err, docs){
            console.log(docs);
        });
    })*/
}

function following_count(req, res){
    let user_id = req.user.sub;
    console.log("1-");
    const pipeline = [
        { $match : { _id : user_id } },
        { $project : { count : { $size : "$following" } } }
    ];
    console.log("2-");
    User.aggregate(pipeline,function(err, user) {
        console.log("3-");
        if (err) {
            console.log("4-");
            res.status(404).send({message: "No s'ha actualitzat"});
        } else {
            console.log("5-");
            res.status(200).send({count: user});
        }
    });
}




module.exports = {
    home,
    proves,
    saveUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUser,
    updateUser,
    getCounters,
    updateNameSurname,
    updatePassword,
    updateBioBirth,

    newfollow,
    followers_count,
    following_count
};
