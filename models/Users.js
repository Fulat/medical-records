const Sequelize = require("sequelize")
const { db } = require("../db")

const Users = db.define("users", {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profile_image: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Users