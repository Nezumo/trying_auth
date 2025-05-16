const express = require("express")
const user = require("../Schema/userSchema")
const db = require("mongodb")
const bcrypt = require("bcrypt")
const oldPassword = require("../Schema/userSchema")
  

module.exports.register_post = ("/register", async (req, res) => {
    
    try {
        let { Email, Password } = req.body
    
        const NewUser = new user({ Email, Password })
        await NewUser.save()
        res.json(NewUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
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