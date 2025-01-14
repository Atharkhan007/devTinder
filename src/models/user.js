const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minLength: 4,
        maxLength: 15,
        required: true,
    },
    lastName: {
        type: String,
        required: false,

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        requried: true,

    },
    age: {
        type: Number,
        min: 18,
        max:60
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: 'https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png',
    },
    about: {
        type: String,
        default: "This is a default generated about."
    },
    skills: {
        type : [String]
                
    },    
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model("User", userSchema);