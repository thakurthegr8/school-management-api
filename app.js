require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./database");
const authControllers = require("./controllers/auth");
const userControllers = require("./controllers/user");
const classControllers = require("./controllers/class");
const subjectControllers = require("./controllers/subject");
const { isAdmin, isTeacher, isStudent } = require("./middlewares");

const app = express();

DB();
app.use(bodyParser.json());

app.post("/auth/signup", authControllers.signup);
app.post("/auth/login", authControllers.login);
app.post("/auth/login/with_token", authControllers.loginWithAccessToken);
app.post("/auth/access_token", authControllers.getAccessToken);

app.get("/users", userControllers.getUser);
app.post("/user", userControllers.addUser);
app.delete("/user/delete", userControllers.deleteUser);

app.get("/admin/classes", classControllers.getClass);
app.get("/teacher/classes", isTeacher, classControllers.getClass);
app.get("/student/classes", isStudent, classControllers.getClass);
app.post("/class", classControllers.addClass);
app.delete("/class/delete", classControllers.deleteClass);
app.patch("/class/update", classControllers.updateClass);
app.post("/class/student", classControllers.addStudentInClass);
app.post("/class/teacher", classControllers.addStudentInClass);

app.get("/subjects", subjectControllers.getSubject);
app.post("/subject", subjectControllers.addSubject);
app.delete("/subject/delete", subjectControllers.deleteSubject);
app.patch("/subject/update", subjectControllers.updateSubject);

app.use((req, res) => res.status(404).json("404 not found"));

app.listen(3000, () => console.log("Running on port 3000"));

module.exports = app;
