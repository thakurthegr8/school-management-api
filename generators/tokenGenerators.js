const jwt = require("jsonwebtoken");

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

module.exports = {generateAccessToken, generateRefreshToken};