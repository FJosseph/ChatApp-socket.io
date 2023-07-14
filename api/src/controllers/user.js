require("dotenv").config();
// Variable de entorno
const { SECRET_KEY } = process.env;

const { User } = require("../db");
const jwt = require("jsonwebtoken");

const createUser = async (firstname, lastname, username, password) => {
  const userFound = await User.findOne({ username });
  if (userFound) throw new Error("User is already exists");
  const user = new User({
    firstname,
    lastname,
    username,
    password,
  });
  user.password = await user.encryptPassword(user.password);
  await user.save();
  const token = jwt.sign({ idUser: user._id }, SECRET_KEY);
  return { user, token, auth: true };
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User doesn't exists");
  const validate = await user.validatePassword(password);
  if (!validate) throw new Error("Username or password is incorrect!");
  const token = jwt.sign({ idUser: user._id }, SECRET_KEY);
  const { username: user_name, conversations_id, firstname, lastname } = user;
  return {
    user: {
      username: user_name,
      conversations_id,
      firstname,
      lastname,
    },
    token,
    auth: true,
  };
};

const getUSer = async (id) => {
  const user = await User.findById(id, {password: 0}).populate([{path:'conversations_id', 
  select: {
    // Seleccionamos los mensajes del usuario
    // messages_user: {
    //   $elemMatch: {
    //     user_id: id
    //   }
    // },
    last_message: 1,
    last_date: 1,
    is_group: 1,
    users_id: 1
  },
  populate:[{path: 'last_message'}, {path: 'users_id', select: ['_id', 'firstname','lastname','username']}]
}]);
//TODO: Hacer la búsqueda del último mensaje para ser previsualizado
  return { user, auth: true };
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
  // return users.map(x=>({
  //     id: x.id,
  //     avatar: x.avatar || ''
  // }))
};

module.exports = {
  createUser,
  loginUser,
  getUSer,
  getAllUsers,
};
