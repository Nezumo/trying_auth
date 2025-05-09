const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Router = require("./auth_Router/router")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


const dbURI = "mongodb+srv://Nezumo:JuliatorHD1@cluster0.olrgx7x.mongodb.net/"
mongoose.connect(dbURI).then(console.log("Database connected"))

app.listen(3001, () => { console.log("listening on Port 3001..") })

app.use("/", Router)