require("dotenv").config()
const app = require("express")()
const { connection } = require("./db")


// Database connection
connection()


app.get("/", (req, res) => {
    res.json({
        status: 200,
        Message: "Welcome to Medical Database by Fulat"
    })
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 3000
app.listen(PORT, () => {
    console.log(`Listening local on: ${HOST}:${PORT}`)
})