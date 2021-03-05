require("dotenv").config()
const app = require("express")()
const { connection } = require("./db")
const { Users, Records } = require('./routes/index')
const bodyParser = require("body-parser")
const cors = require("cors")

// Database connection
connection()

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({
        status: 200,
        Message: "Welcome to Medical Database by Fulat"
    })
})

// Routes
app.use("/users", Users)
app.use("/records", Records)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 3000
app.listen(PORT, () => {
    console.log(`\nListening local on: ${HOST}:${PORT}\n`)
})