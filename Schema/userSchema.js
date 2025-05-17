const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { isFunctionDeclaration } = require("typescript");
const { isEmail } = require("validator")

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        unique: true, 
        required: [true, "please enter an Email"],
        validate: [isEmail, "please enter a valid Email" ]
        
    },
    Password: {
        type: String,
        required: [true, "please enter a Password"], 
        minlength: [6, "password should be at least 6 characters"]
    }

})

UserSchema.post("save", function (doc, next) {
    console.log("new user was created & saved", doc.Password)

    next()
})

UserSchema.pre("save", async function(next) {
    
    const salt = await bcrypt.genSalt(10)
    this.Password = await bcrypt.hash(this.Password, salt)
    next()
})




module.exports.user = mongoose.model("user", UserSchema)



