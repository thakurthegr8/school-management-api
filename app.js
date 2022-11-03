require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DB = require("./database");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const classRoutes = require("./routes/class");
const subjectRoutes = require("./routes/subject");
const scoreCardRoutes = require("./routes/score_card");
const viewRoutes = require("./routes/views");

const app = express();

DB();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/", viewRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/class", classRoutes);

app.use("/api/subject", subjectRoutes);

app.use("/api/score_card", scoreCardRoutes);

app.use((req, res) => res.status(404).json("404 not found"));

app.listen(3000, () => console.log("Running on port 3000"));

module.exports = app;
