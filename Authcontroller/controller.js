const express = require("express")
const { user } = require("../Schema/userSchema")
const db = require("mongodb")
const bcrypt = require("bcrypt")
const oldPassword = require("../Schema/userSchema")
const { Error } = require("mongoose")
  

const ErrorHandler = (err) => {
    let errors = { email: "", Password: "" }
    
    
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
    const Users = await user.find()

    res.send(Users)
}) 

module.exports.login_post = ("/login", async (req, res) => {

    const User = await user.findOne({ Email: req.body.Email })
    

    if (User != null ) {
        
        res.send("logged in")
    } else {
        res.status(404).send("User not found");
    }
})


module.exports.login_get = ("/login", async (req, res) => {
    const Users = await user.find()

    res.send(Users)
})