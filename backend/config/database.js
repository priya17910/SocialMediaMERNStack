const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            family: 4
        })
        .then((data) => {
            console.log(`Connected to MongoDB: ${data.connection.host}`);
        })
        .catch((err) => console.log(err));
}