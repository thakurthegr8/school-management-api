const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(501).json("No access token");
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const role = decodedToken.data.role;
    if (role != "admin") return res.status(401).json("unauthorized access");
    req.user = decodedToken.data._id;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
const isTeacher = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(501).json("No access token");
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const role = decodedToken.data.role;
    if (role != "teacher") return res.status(401).json("unauthorized access");
    req.user = decodedToken.data._id;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
const isStudent = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(501).json("No access token");
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const role = decodedToken.data.role;
    if (role != "student") return res.status(401).json("unauthorized access");
    req.user = decodedToken.data._id;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { isAdmin, isTeacher, isStudent };
