const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://atharkhan491:MrUqNyLPjO5JhQiL@devtinder.6c7zc.mongodb.net/devTinder");
};

module.exports = connectDB;

