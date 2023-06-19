const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const { expressjwt: expressjwt } = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  } catch (err) {
    res.status(400).json({ err: errorHandler(err) });
  }
};

exports.signin = async (req, res) => {
  // find the user based on email
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please sign up.",
      });
    }
    //if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    //persist the token as 't' in cookie with expiry date
    const { _id, name, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  } catch (err) {
    res.status(400).json({ error: errorHandler(err) });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successfully" });
};

exports.requireSignin = expressjwt({
  secret: "dwdwqdwdq",
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
