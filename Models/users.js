const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, index: true },
    password: {
        type: String,
        required: true
    }
})

userSchema.plugin(uniqueValidator);

const users = mongoose.model("users", userSchema)

module.exports = users