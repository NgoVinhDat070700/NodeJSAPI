const mongoose = require("mongoose");
const bluebird = require("bluebird");
const connectDB = () => {
  mongoose.Promise = bluebird;
  return mongoose.connect(process.env.LINK_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
