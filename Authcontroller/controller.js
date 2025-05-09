const express = require("express")
const user = require("../Schema/userSchema")
const { default: mongoose } = require("mongoose")
const db = require("mongodb")


  

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
    let args = req.body.Email
    
    
    const Users = await user.findOne({ Email: req.body.Email })

    if (Users != null) {
        res.json("logged in")
    } else {
        res.send("failed")
        
    }
})


module.exports.login_get = ("/login", async (req, res) => {
    const Users = await user.find()

    res.send(Users)
})