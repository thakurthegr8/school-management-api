const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const generateAccessToken = (accessTokenData) => {
  //accessTokenData =  { id: response._id, roles: response.roles }
  return jwt.sign({ data: accessTokenData }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });
};

const generateRefreshToken = (refreshTokenData) => {
  //accessTokenData =  { id: response._id }
  return jwt.sign({ data: refreshTokenData }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });
};

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
        roles: response.roles,
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
          roles: getUser.roles,
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
    return res.status(400).json(error);
  }
};

const getAccessToken = async (req, res) => {
  const body = req.body;
  try {
    const decodedToken = jwt.verify(body.refresh_token, process.env.JWT_SECRET);
    const getUser = await User.findById(decodedToken.data._id);
    if (getUser) {
      const accessToken = generateAccessToken({
        _id: getUser._id,
        roles: getUser.roles,
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

module.exports = { signup, login, getAccessToken };
