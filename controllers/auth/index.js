const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../../database/models/User");
const {generateAccessToken, generateRefreshToken} = require("../../generators/tokenGenerators");

const signup = async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  try {
    try {
      const hashedPassword = await bcrypt.hash(body.password, saltRounds);
      const updatedBody = { ...body, password: hashedPassword };
      const response = await User.create(updatedBody);
      const accessToken = generateAccessToken({
        _id: response._id,
        role: response.role,
      });
      const refreshToken = generateRefreshToken({
        _id: response._id,
      });
      return res.status(201).json({
        ...response._doc,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const body = req.body;
  try {
    const getUser = await User.findOne({ email: body.email });
    if (getUser) {
      const isPasswordMatched = await bcrypt.compare(
        body.password,
        getUser.password
      );
      if (isPasswordMatched) {
        const accessToken = generateAccessToken({
          _id: getUser._id,
          role: getUser.role,
        });
        const refreshToken = generateRefreshToken({
          _id: getUser._id,
        });
        return res.status(200).json({
          ...getUser._doc,
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
      return res.status(404).json("Invalid email or password");
    }
    return res.status(400).json("Invalid email or password");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const loginWithAccessToken = async (req,res)=>{
  const oldAccessToken = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(oldAccessToken, process.env.JWT_SECRET);
    const offset = moment.unix(decodedToken.exp).diff(moment(), "minutes");
    if(offset > 60) return res.status(200).json("token expired");
    const getUser = await User.findById(decodedToken.data._id);
    if (getUser) {
      const newAccessToken = generateAccessToken({
        _id: getUser._id,
        role: getUser.role,
      });
      const refreshToken = generateRefreshToken({
        _id: getUser._id,
      });
      return res
        .status(200)
        .json({
          ...getUser._doc,
          access_token: newAccessToken,
          refresh_token: refreshToken,
        });
    }
  } catch (error) {
    return res.status(200).json(error);
  }
}
const getAccessToken = async (req, res) => {
  const body = req.body;
  try {
    const decodedToken = jwt.verify(body.refresh_token, process.env.JWT_SECRET);
    const getUser = await User.findById(decodedToken.data._id);
    if (getUser) {
      const accessToken = generateAccessToken({
        _id: getUser._id,
        role: getUser.role,
      });
      const refreshToken = generateRefreshToken({
        _id: getUser._id,
      });
      return res
        .status(200)
        .json({
          ...getUser._doc,
          access_token: accessToken,
          refresh_token: refreshToken,
        });
    }
  } catch (error) {
    return res.status(200).json("Invalid refresh token");
  }
};

module.exports = { signup, login, getAccessToken,loginWithAccessToken };
