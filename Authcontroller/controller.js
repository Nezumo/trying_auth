const express = require("express")
const { user } = require("../Schema/userSchema")
const db = require("mongodb")
const bcrypt = require("bcrypt")
const oldPassword = require("../Schema/userSchema")
const { Error } = require("mongoose")
  

const ErrorHandler = (err) => {
    console.log(err.message, err.code)
    
    let errors = { email: "", Password: "" }
    
    if (err.code === 11000) {
        errors.email = "email already used"
        return errors
    }
    if (err.message.includes("failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
        
    } 

    console.log(errors)
    return errors
   
}

module.exports.register_post = ("/register", async (req, res) => {
    
    try {
        let { Email, Password } = req.body
    
        const NewUser = new user({ Email, Password })
        await NewUser.save()
        res.json(NewUser)
    } catch (err) {
        const error =ErrorHandler(err)
        res.status(400).json({error})
    }

    
}) 

module.exports.register_get = ("/register", async (req, res) => {
    try {
        const Users = await user.find()
        res.send(Users)

    } catch (err) {
        const error =ErrorHandler(err)
        res.status(400).json({error})
    }
    
}) 

function compareHash(password, hashed) {
    return bcrypt.compare(password, hashed)
}

module.exports.login_post = ("/login", async (req, res) => {
    try {
        const User = await user.findOne({ Email: req.body.Email })
        

        if (!User) {
            res.status(404).send("User not found: ");
           
        } 
        const match =  compareHash(req.body.Password,  User.Password );
        if (!match) {
            res.status(401).send("incorrect input credentials: ")
        } else {
            res.send("logged in")
        }
        
    } catch (err) {
        const error = ErrorHandler(err)
        res.status(400).json({error})
    }
    
})


module.exports.login_get = ("/login", async (req, res) => {
    try {
        
        const Users = await user.find()
        res.send(Users)

    } catch (err) {
        
        const error =ErrorHandler(err)
        res.status(400).json({error})
    
    }
    
    
})