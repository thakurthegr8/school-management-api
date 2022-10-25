require("dotenv").config();
const mongoose = require("mongoose");

const db = async ()=> mongoose
.connect(
    `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@cluster0.93tbw3c.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
);

module.exports = db;
