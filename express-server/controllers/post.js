"use strict";
require("path");
require("fs");
const moment = require("moment");
require("mongoose-paginate-v2");
const Post = require("../models/post");
require("../models/user");
const Follow = require("../models/follow");
const User = require("../models/user");

function provesPost(req, res){
    res.status(200).send({message: "Controlador de posts diu: Hola"});
}

function savePost(req, res){
    const params = req.body;
    const post = new Post();

    post.title = params.title;
    post.content = params.content;
    post.file = "null";
    post.user = req.user.sub;
    post.created_at = Date.now();

    if (!params.content) {
        return res.status(200).send({message: "El contingut és necessari"});
    }

    post.save((err, postStored) => {
        if(err){
            res.status(500).send({message: "Error al guardar la publicació"});
        }else{
            if(!postStored){
                res.status(404).send({message: "No s'ha guardat la publicació'"});
            }else{
                res.status(200).send({post: postStored});
            }
        }
    });
}

function getPosts(req, res){
    let page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    const itemsPerPage = 10;

    Follow.find({user: req.user.sub}).populate('followed').exec((err, follows) => {
        if(err) {
            res.status(500).send({message: "Error al carregar els seguidors"});

            const follows_clean = [];

            follows.forEach((follow) => {
                follows_clean.push(follow.followed);
            });

            Post.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, posts, total) => {
                if (err) {
                    res.status(500).send({message: "Error al carregar les publicacions"});
                } else {
                    if (!posts) {
                        res.status(404).send({message: "No hi ha publicacions"});
                    } else {
                        return res.status(200).send({
                            total: total,
                            pages: Math.ceil(total / itemsPerPage),
                            posts: posts
                        });
                    }
                }
            });
        }
});
}

function getPost(req, res){
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
        if(err){
            res.status(500).send({message: "Error al recuperar la publicació"});
        }else{
            if(!post){
                res.status(404).send({message: "No s'ha trobat la publicació"});
            }else{
                res.status(200).send({post});
            }
        }
    });
}

function deletePost(req, res){
    const postId = req.params.id;

    Post.findByIdAndRemove(postId, (err, postRemoved) => {
        if(err){
            res.status(500).send({message: "Error al eliminar la publicació"});
        }else{
            if(!postRemoved){
                res.status(404).send({message: "No s'ha eliminat la publicació"});
            }else{
                res.status(200).send({post: postRemoved});
            }
        }
    });
}

function getOwnPosts(req, res){
    const userId = req.params.id;

    Post.find({'user': userId}).sort('-created_at').populate('user').exec((err, posts) => {
        if(err){
            res.status(500).send({message: "Error al carregar les publicacions"});
        }else{
            if(!posts){
                res.status(404).send({message: "No s'han trobat les publicacions"});
            }else{
                res.status(200).send({posts});
            }
        }
    });
}

function getAllPosts(req, res){
    Post.find().sort('-created_at').populate('user').exec((err, posts) => {
        if(err){
            res.status(500).send({message: "Error al carregar les publicacions"});
        }else{
            if(!posts){
                res.status(404).send({message: "No s'han trobat les publicacions"});
            }else{
                res.status(200).send({posts});
            }
        }
    });
}

function addLike(req, res){
    const postId = req.body.id;

    Post.updateOne(
        { _id : postId },
        {$inc : { likes : 1}},
        function(err, post) {
            if (err) {
                res.status(404).send({message: "No s'ha actualitzat"});
            } else {
                res.status(200).send(post);
            }
        }
    );
}


module.exports = {
    provesPost,
    savePost,
    getPosts,
    getPost,
    deletePost,
    getOwnPosts,
    getAllPosts,
    addLike
};