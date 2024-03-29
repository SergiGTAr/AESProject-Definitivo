"use strict";

const Comment = require("../models/comment");
const jwt = require("../services/jwt");

require("../models/user");
require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

function provesComment(req, res){
    res.status(200).send({message: "Controlador de comentaris diu: Hola"});
}

function getAllComments(req, res){
    Comment.find({}).sort({'created_at': -1}).exec(function (err, comments){
        if(err){
            res.status(500).send({message: "Error al obtenir els comentaris."});
        }else{
            if(!comments){
                res.status(404).send({message: "No s'han trobat comentaris."});
            }else{
                res.status(200).send({comments});
            }
        }
    });
}

function getCommentsByPost(req, res){
    const postId = req.params.id;

    Comment.find({'post': postId}).sort({'created_at': -1}).exec(function (err, comments){
        if(err){
            res.status(500).send({message: "Error al obtenir els comentaris."});
        }else{
            if(!comments){
                res.status(404).send({message: "No s'han trobat comentaris."});
            }else{
                res.status(200).send({comments});
            }
        }
    });
}

function deleteComment(req, res){
    const commentId = req.params.id;

    Comment.findByIdAndRemove(commentId, (err, commentRemoved) => {
        if (err) {
            res.status(500).send({message: "Error al eliminar el comentari."});
        } else {
            if (!commentRemoved) {
                res.status(404).send({message: "No s'ha pogut eliminar el comentari."});
            } else {
                res.status(200).send({comment: commentRemoved});
            }
        }
    });
}

function saveComment(req, res){
    const params = req.body;
    const comment = new Comment();

    if(
        params.content &&
        params.post
    ){
        comment.content = params.content;
        comment.user = req.user.sub;
        comment.post = params.post;
        comment.created_at = Date.now();

        comment.save((err, commentStored) => {
            if (err) {
                return res.status(500).send({message: "Error al guardar el comentari."});
            }
            if (commentStored) {
                res.status(200).send({comment: commentStored});
            } else {
                res.status(404).send({message: "El comentari no s'ha pogut guardar."});
            }
        });
    }else{
        res.status(200).send({
            message: "No pots deixar el comentari buit.",
        });
    }
}

function getCountCommentbyPost(req, res){

    const postId = req.params.id;

    Comment.count({ "post" : postId }, function (err, comments) {
        if (err){
            console.log(err);
        }else{
            res.status(200).send({comments: comments});
        }
    });
}


module.exports = {
    provesComment,
    getAllComments,
    getCommentsByPost,
    deleteComment,
    saveComment,
    getCountCommentbyPost
};

