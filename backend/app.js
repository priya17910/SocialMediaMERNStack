const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config({
        path: "backend/config/config.env"
    });
}


// Using Middlewares ---> Mandatory
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));
app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Importing Router
const post = require('./routes/Post');
const user = require('./routes/User');

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// app.use(express.static(path.join(_dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(_dirname, "../frontend/build/index.html"));
// })
module.exports = app;