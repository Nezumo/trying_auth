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
    let args = req.body
    const Users = await user.find()
    if (args.email === Users.email) {
        res.send("logged in")
    } else {
        res.json(Users)
        
    }
})

