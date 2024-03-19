const express = require('express');
const { register, login, followUser, logout, updatePassword, updateProfile, deleteUserProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getUserPosts, getAuthenticationValue } = require('../controllers/User');
const { isAuthenticated } = require('../middleware/Auth');
const router = express.Router();
const { getMyPosts } = require('../controllers/User')


router.route("/register").post(register);

router.route("/getAuthValue").get(getAuthenticationValue);

router.route("/login").post(login);


router.route("/follow/:id").get(isAuthenticated, followUser);


router.route("/logout").get(logout);


router.route("/update/password").put(isAuthenticated, updatePassword);


router.route("/update/profile").put(isAuthenticated, updateProfile);


router.route("/delete/me").delete(isAuthenticated, deleteUserProfile);


router.route("/me").get(isAuthenticated, myProfile);


router.route("/user/:id").get(isAuthenticated, getUserProfile);


router.route("/users").get(isAuthenticated, getAllUsers);


router.route("/forgot/password").post(forgotPassword);


router.route("/password/reset/:token").put(resetPassword);


router.route("/my/posts").get(isAuthenticated, getMyPosts);


router.route("/userposts/:id").get(isAuthenticated, getUserPosts);


module.exports = router;