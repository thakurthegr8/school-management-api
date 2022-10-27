require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./database");
const authControllers = require("./controllers/auth");
const userControllers = require("./controllers/user");
const classControllers = require("./controllers/class");
const { isAdmin } = require("./middlewares");

const app = express();

DB();
app.use(bodyParser.json());

app.post("/auth/signup", authControllers.signup);
app.post("/auth/login", authControllers.login);
app.post("/auth/login/with_token", authControllers.loginWithAccessToken);
app.post("/auth/access_token", authControllers.getAccessToken);

app.get("/users", isAdmin, userControllers.getUser);
app.post("/user", isAdmin, userControllers.addUser);
app.delete("/user/delete", isAdmin, userControllers.deleteUser);

app.get("/classes", classControllers.getClass);
app.post("/class", isAdmin, classControllers.addClass);

app.use((req, res) => res.status(404).json("404 not found"));

app.listen(3000, () => console.log("Running on port 3000"));

module.exports = app;
