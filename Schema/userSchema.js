const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")
const { Unique } = require("typeorm")
const bcrypt = require("bcrypt")

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

UserSchema.pre("save", async function(next) {
    const salt =  await bcrypt.genSalt(10)
    this.Password = await bcrypt.hash(this.Password, salt)
    next()
})


const user = mongoose.model("user", UserSchema)
module.exports = user
module.exports = bcrypt