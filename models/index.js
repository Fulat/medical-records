const Users = require("./Users")
const Records = require("./Records")

// Models relationship
Records.belongsTo(Users)

module.exports = {
    Users,
    Records
}