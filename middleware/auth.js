const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile");

exports.authUser = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token);
    if (!token) {
      res.send({ message: "Token is not set in Request Header" });
    }

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, "Hanuman");

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log(userauth)
      res.send({ message: "Authorization Error" });
    }

    req.Userid = user._id;

    next();
  } catch (error) {
    res.send({ message: error });
  }
};
exports.authProfile = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {

      res.send({ message: "Token is not set in Request Header" });
    }

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, "Hanuman");
    console.log(decoded)
    const profile = await Profile.findById(decoded.Pid);

    if (!profile) {
      console.log(userauth)
      res.send({ message: "Authorization Error" });
    }

    req.Profileid = profile._id;
    req.Userid = profile.RefId;
    next();
  } catch (error) {
    res.send({ message: error });
  }
};
