const express = require('express');
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updatePostCaption, addComment, deleteComment } = require('../controllers/Post');
const router = express.Router();
const { isAuthenticated } = require('../middleware/Auth');


router.route("/post/upload").post(isAuthenticated, createPost);


router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);


router.route("/post/:id").put(isAuthenticated, updatePostCaption).delete(isAuthenticated, deletePost);


router.route("/posts").get(isAuthenticated, getPostOfFollowing);


router.route("/post/comment/:id").put(isAuthenticated, addComment).delete(isAuthenticated, deleteComment);



module.exports = router;