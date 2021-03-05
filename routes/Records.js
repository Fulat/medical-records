const router = require("express").Router()
const { Users, Records } = require("../models/index")
const Joi = require("joi")
const bcrypt = require("bcryptjs")

router.get("/user/:id", async (req, res) => {
    await Records.findOne({
        where: {
            userId: req.params.id,
        },
        attributes: ["id"],
        include: {
            model: Users,
            attributes: ["id", "first_name", "last_name", "email", "profile_image"],
        },
    }).then((record) => {
        res.json({
            status: 200,
            record
        })
    }).catch(error => res.send(error))
})

router.post("/", async (req, res) => {
    await Records.create(req.body).then((record) => {
        res.json({
            status: 200,
            record
        })
    }).catch(error => res.send(error))
})
module.exports = router