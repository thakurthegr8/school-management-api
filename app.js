require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const DB = require("./database");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const classRoutes = require("./routes/class");
const subjectRoutes = require("./routes/subject");
const scoreCardRoutes = require("./routes/score_card");

const app = express();

DB();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/class", classRoutes);

app.use("/subject", subjectRoutes);

app.use("/score_card", scoreCardRoutes);

app.use((req, res) => res.status(404).json("404 not found"));

app.listen(3000, () => console.log("Running on port 3000"));

module.exports = app;
