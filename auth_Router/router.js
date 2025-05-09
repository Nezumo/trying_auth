const express = require("express")
const router = express.Router()
const controller = require("../Authcontroller/controller")

router.get("/", (req, res) => {
    res.send("Welcome")
})
router.get("/register", controller.register_get)
router.post("/register", controller.register_post)
router.get("/login", controller.login_get)
router.post("/login", controller.login_post)

module.exports = router