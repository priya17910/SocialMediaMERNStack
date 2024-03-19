const Post = require('../models/Post');
const User = require('../models/User');
const { SendEmail } = require('../middleware/SendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { isAuthenticated } = require('../middleware/Auth');

exports.getAuthenticationValue = async(req, res) => {
    return isAuthenticated;
};


exports.register = async(req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        let user = await User.findOne({email});
        if (user)
        {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "UserAvatarSM",
        });


        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
        });

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true,
        };
        res.status(201)
            .cookie("token", token, options)
            .json({
                success: true,
                user,
                token,
                message: "User registered successfully"
            });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password").populate("posts followers following");
        if (!user)
        {
            return res.status(400).json ({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch)
        {
            return res.status(400).json ({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true,
        }
        res.status(200)
            .cookie("token", token, options)
            .json({
                success: true,
                user,
                token,
            });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.followUser = async(req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToFollow)
        {  
            res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
        if (loggedInUser.following.includes(userToFollow._id))
        {
            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(indexFollowing, 1);
            const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(indexFollower, 1);
            await loggedInUser.save();
            await userToFollow.save();
            res.status(200).json({
                success: true,
                message: "User Unfollowed"
            });
        }
        else
        {
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
            await loggedInUser.save();
            await userToFollow.save();
            res.status(200).json({
                success: true,
                message: "User Followed"
            });
        }
    }
    catch(error)
    {
        res.status(500).json({
            succesS: false,
            message: error.message,
        });
    }
};


exports.logout = async(req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            succesS: true,
            message: "Logged Out",
        });
    }
    catch(error) 
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updatePassword = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
        {
            return res.status(400).json({
                success: false,
                message: "Please enter both old and new passwords",
            });
        }
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch)
        {
            return res.status(400).json({
                success: false,
                message: "Incorrect Old Password"
            });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Updated",
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email, avatar } = req.body;
        if (name)
        {
            user.name = name;
        }
        if (email)
        {
            user.email = email;
        }
        if(avatar)
        {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "UserAvatarSM",
            });
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated",
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userId = req.user._id;
        const followers = user.followers;
        const followings = user.following;
        const posts = user.posts;



        // Removing Avatar from Cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);


        await user.deleteOne();
        // logout use after deleting profile
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        // deleting posts after deleting user
        for (let i = 0; i < posts.length; i++)
        {
            const post = await Post.findById(posts[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await post.deleteOne();
        }

        // removing user from follower's following
        for (let i = 0; i < followers.length; i++)
        {
            const follower = await User.findById(followers[i]);
            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);
            await follower.save();
        }

        // removing user from following's followers
        for (let i = 0; i < followings.length; i++)
        {
            const following  = await User.findById(followings[i]);
            const index = following.followers.indexOf(userId);
            following.followers.splice(index, 1);
            await following.save();
        }


        // removing all comments of the user from all posts
        const allPosts = await Post.find();
        for (let i = 0; i < allPosts.length; i++)
        {
            const post = await Post.findById(posts[i]._id);
            for (let j = 0; j < post.comments.length; j++)
            {
                if (post.comments[j].user === userId)
                {
                    post.comments.splice(j, 1);
                }
            }
            await post.save();
        }

        // removing all likes of the user from all posts
        for (let i = 0; i < allPosts.length; i++)
        {
            const post = await Post.findById(posts[i]._id);
            for (let j = 0; j < post.likes.length; j++)
            {
                if (post.likes[j] === userId)
                {
                    post.likes.splice(j, 1);
                }
            }
            await post.save();
        }

        res.status(200).json({
            success: true,
            message: "Profile Deleted",
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.myProfile = async(req, res) => {
    try
    {
        const user = await User.findById(req.user._id)
                                .populate("posts followers following");
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ADMIN
exports.getUserProfile = async (req, res) => {
    try 
    {
        const user = await User.findById(req.params.id).populate("posts followers following");
        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllUsers = async (req, res) => {
    try
    {
        const users = await User.find({
            name: { $regex: req.query.name, $options: 'i' },
        });
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.forgotPassword = async(req, res) => {
    try
    {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;
        const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
        try
        {
            await SendEmail(
                {
                    email: user.email, 
                    subject: "Reset Password",
                    message,
                });
            res.status(200).json({
                success: true,
                message: `Email Sent to ${user.email}`,
            });
        }
        catch (error)
        {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if(!user)
        {
            return res.status(401).json({
                success: false,
                message: "Token has expired or is invalid"
            });
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



exports.getMyPosts = async (req, res) => {
    try
    {
        const user = await User.findById(req.user._id);
        const posts = [];
        for (let i = 0; i < user.posts.length; i++)
        {
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post);
        }
        res.status(200).json({
            success: true,
            posts,
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



exports.getUserPosts = async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);
        const posts = [];
        for (let i = 0; i < user.posts.length; i++)
        {
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post);
        }
        res.status(200).json({
            success: true,
            posts,
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}