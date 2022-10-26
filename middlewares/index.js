const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const roles = decodedToken.data.roles;
    if (!roles.includes("admin"))
      return res.status(401).json("unauthorized access");
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
const isTeacher = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const roles = decodedToken.data.roles;
    if (!roles.includes("teacher"))
      return res.status(401).json("unauthorized access");
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
const isStudent = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const roles = decodedToken.data.roles;
    if (!roles.includes("student"))
      return res.status(401).json("unauthorized access");
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { isAdmin, isTeacher, isStudent };
