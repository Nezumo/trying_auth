const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")
const { Unique } = require("typeorm")

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        Unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

})
const user = mongoose.model("user", UserSchema)
module.exports = user