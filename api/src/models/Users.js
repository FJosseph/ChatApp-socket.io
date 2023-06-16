const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const Users = new Schema(
  {
    conversations_id: [{
      type: Schema.Types.ObjectId,
      ref: 'conversations'
    }],
    avatar: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

Users.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

Users.methods.validatePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = model("user", Users);
