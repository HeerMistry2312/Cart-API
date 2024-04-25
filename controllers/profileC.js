const Profile = require("../models/profile");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');

//Create Profile
exports.create = async (req, res) => {
  try {
    const { Name, AuthorizedAs } = req.body;

    if (!Name || !AuthorizedAs) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const profile = new Profile({
      Name,
      AuthorizedAs

    });
    profile.RefId = req.Userid;

    const savedProfile = await profile.save();

    if (!savedProfile) {
      return res.status(500).send({ message: "Failed to create profile" });
    }

    console.log("Created profile:", savedProfile);

    res.send({ data: savedProfile, message: "Profile created successfully" });
  } catch (error) {
    console.error("Error creating profile:", error);

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: error.message });
    }

    res
      .status(500)
      .send({ message: error.message || "Error creating profile" });
  }
};

//Show Profiles
exports.show = async (req, res) => {
  try {
    console.log("Fetching profile for refId:", req.Userid);

    const profile = await Profile.find({ RefId: req.Userid });

    if (!profile || profile.length === 0) {
      console.log("No profile found for refId:", req.Userid);
      return res.status(404).send({ message: "Profile not found" });
    }

    const Name = profile.map((profile) => profile.Name);

    console.log("Extracted Names:", Name);

    res.send(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .send({ message: error.message || "Error fetching profile" });
  }
};

//Find particular profile
exports.findParticular = async (req, res) => {
  try {
    console.log("Fetching Details for Id:", req.params.id);
    const profile = await Profile.findOne({ _id: req.params.id });
    if (!profile || profile === 0) {
      console.log("No profile found for Id:", req.params.id);
      return res.status(404).send({ message: "Profile not found" });
    }

    const token = jwt.sign(
      { Pid: profile._id, Rid: profile.RefId },

      "Hanuman",
      { expiresIn:1000000 }
    );
    res.send({ data: token, message: profile });
    return;
  } catch (err) {
    console.error("Error fetching profile:", err);
    res
      .status(500)
      .send({ message: err.message || "Error fetching profile" });
  }
};

//Delete Profile by Profiler
exports.deleteProfile = async (req, res) => {
  try{
    const  del = await Profile.findOne({_id: req.Profileid, RefId: req.Userid })

    console.log(del)

    if (!del) {
          return res.status(404).send({ message: 'Profile not found' })
        }
        await Cart.findOneAndDelete({profileId:req.Profileid})
        await Profile.findOneAndDelete({_id: req.Profileid, RefId: req.Userid })
        res.send({ message: 'Profile deleted successfully' });
    }catch (err) {
        console.error("Error deleting profile:", err);
        res.status(500).send({ message: err.message || 'Error deleting profile' });
      }
  }



//edit Profile by Profiler
exports.editProfile = async (req, res) => {
  try {

    let  edit = await Profile.findOne({_id: req.Profileid, RefId: req.Userid })
    if(!edit){
      return res.status(404).send({ message: 'Profile not found' })
    }

    edit = await Profile.findByIdAndUpdate(req.Profileid, req.body);
    edit.save();
    res.send({ message: 'Profile deleted successfully' });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}




