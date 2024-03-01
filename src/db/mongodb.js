const mongoose = require("mongoose");
const { print, OutputType } = require('../helper/print.js');
const Exception = require("../exceptions/Exception.js");

async function connectToDatabase() {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            // console.log("Connect database successfully!!");
            print("Connect database successfully!!", OutputType.SUCCESS)
        })
        .catch((err) => {
            
            throw new Error(Exception.CANNOT_CONNECT_MONGODB)
        });
}
module.exports = connectToDatabase