require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./database");
const authControllers = require("./controllers/auth");

const app = express();

DB();
app.use(bodyParser.json());

app.post("/auth/signup", authControllers.signup);
app.post("/auth/login",authControllers.login);
app.post("/auth/access_token",authControllers.getAccessToken);
app.use((req,res)=>res.status(404).json("404 not found"));

app.listen(3000, () => console.log("Running on port 3000"));

module.exports = app;