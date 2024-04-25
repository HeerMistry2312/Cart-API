const mongoose = require('mongoose');
exports.connectDB = async () => {
  try {
    let connect = await mongoose.connect('mongodb+srv://heermistry2312:jwt123@cluster0.ub1wzmo.mongodb.net/');
    console.log("DataBase Connected");
  } catch (err) {
    res.status(401).send({ message: err });
    process.exit(1);
  }
};
