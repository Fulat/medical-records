const router = require("express").Router()
const { Users } = require("../models/index")
const Joi = require("joi")
const bcrypt = require("bcryptjs")

const UserSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).alphanum().required(),
    profile_image: Joi.string().required(),
})
const UpdateUserSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(6).alphanum().required(),
    profile_image: Joi.string().required(),
})


router.get("/", async (re, res) => {
    await Users.findAll().then((users) => {
        res.json({
            status: 200,
            users
        })
    }).catch(error => res.send(error))
})


router.get("/:id", async (req, res) => {
    await Users.findOne({ where: { id: req.params.id } }).then((user) => {
        res.json({
            status: 200,
            user
        })
    }).catch(error => res.send(error))
})


router.post("/", async (req, res) => {
    await UserSchema.validateAsync(req.body).then(async (value) => {
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(value.password, salt)
        const { first_name, last_name, email, profile_image } = value
        const Email = await Users.findOne({ where: { email: email } })

        if (Email) return res.json({ error: "This email already exist" })

        await Users.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
            profile_image
        }).then(user => {
            res.json({
                status: 200,
                user
            })
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
})

router.put('/:id', async (req, res) => {
    await Users.findOne({
        where: { id: req.params.id }
    }).then(async (User) => {
        await UpdateUserSchema.validateAsync(req.body).then(async () => {
            const { first_name, last_name, profile_image, password } = req.body
            const salt = bcrypt.genSaltSync(10)
            const encryptedPassword = bcrypt.hashSync(password, salt)
            User.update({
                first_name,
                last_name,
                password: encryptedPassword,
                profile_image
            }).then(() => res.json(User))
        }).catch(error => res.send(error))
    })
})

router.delete('/:id', async (req, res) => {
    await Users.findOne({
        where: { id: req.params.id }
    }).then((User) => {
        User.destroy()
        res.json({
            status: 200,
            message: "User deleted"
        })
    }).catch((error) => {
        res.json({
            status: 404,
            message: "This user does not exist"
        })
    })
})

module.exports = router