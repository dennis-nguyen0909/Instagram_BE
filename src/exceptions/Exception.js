const { print, OutputType } = require('../helper/print.js')
class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database is username and password!!"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string!!"
    static CANNOT_CONNECT_MONGODB = "Connect MongoDB is Error"
    constructor(message) {
        super(message)
        print(message, OutputType.ERROR)
    }
}
module.exports = Exception