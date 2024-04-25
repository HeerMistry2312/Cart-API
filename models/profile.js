const mongoose = require("mongoose");
const User = require('../models/user')
const profileSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  AuthorizedAs: {
    type: String,
    required: true,
  },
  RefId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
});
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;