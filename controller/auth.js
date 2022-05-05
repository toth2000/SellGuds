const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {
  refresh_token_expire_time,
  access_token_expire_time,
} = require("../config");

const User = require("../models/User");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const jwtSign = async (user) => {
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: refresh_token_expire_time,
  });

  const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: access_token_expire_time,
  });

  await User.findByIdAndUpdate(
    user._id,
    { refreshToken: refreshToken },
    { new: true }
  );

  // Destructing password and other from user object
  // To return user without hashed password
  const { password, ...others } = user._doc;
  const response = { ...others, refreshToken, accessToken };

  return response;
};

const refreshAccessToken = (req, res) => {
  try {
    const token = req.body.refreshToken;

    if (!token)
      return res.status(401).json({ message: "Refresh Token Required" });

    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, decodedData) => {
      if (err instanceof jwt.TokenExpiredError)
        return res.status(401).json({ message: "Refresh Token Expired" });

      if (err)
        return res
          .status(403)
          .json({ message: "Invalid token, authentication is required" });

      const userId = decodedData.id;

      const user = await User.findById(userId);

      if (!user)
        return res.status(404).json({ message: "User doesn't exists" });

      if (!user.refreshToken || user.refreshToken !== token)
        return res.status(401).json({ message: "Login Required" });

      const newAccessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: access_token_expire_time,
      });

      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.log("auth.js controlled, refreshAccessToken function ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Incomplete data provided",
        info: "User data is incomplete to create a new account",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res.status(405).json({
        info: "User already exists with same email address",
        message: "User already registered",
      });

    const SALT = process.env.PASS_SALT.toString();
    const encryptedPassword = CryptoJs.AES.encrypt(password, SALT);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();
    const response = await jwtSign(savedUser);

    return res.status(200).json(response);
  } catch (error) {
    console.log("auth.js controlled, registerUser function ", error);
    return res
      .status(500)
      .json({ info: "Server Error Occured", message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        info: "email and password are required",
        message: "Email and Password are not provided",
      });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({
        info: "User does not exists",
        message: "User does not exists with the provided email",
      });

    const SALT = process.env.PASS_SALT.toString();
    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      SALT
    ).toString(CryptoJs.enc.Utf8);

    if (decryptedPassword !== password)
      return res.status(406).json({
        message: "Invalid password or email",
        info: "provided password or email is incorrect",
      });

    const response = await jwtSign(user);

    return res.status(200).json(response);
  } catch (error) {
    console.log("Auth controlled, loginUser method", error);
    return res.status(500).json({
      info: "Server Error Occurred",
      message: "Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { password, refreshToken, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    console.log("Error in getUserById, auth.js controller\n", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  jwtSign,
  refreshAccessToken,
  getUserById,
};
