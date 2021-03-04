const { Sequelize } = require("sequelize")


const db = new Sequelize({
    database: "medical_database",
    dialect: "postgres",
    username: "postgres",
    password: "Alicia01"
})


const connection = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log('\nDatabase connection has been established successfully.\n')
    } catch (error) {
        console.error('\nUnable to connect to the database:', error + "\n")
    }
}

module.exports = {
    db,
    connection
}