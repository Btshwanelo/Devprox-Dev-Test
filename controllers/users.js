const User = require('../models/User')
const {BadRequestError} = require('../errors')

const createUser = async (req, res) => {
  const {name, surname, id_no, DoB} = req.body
  console.log(id_no)
  if(id_no.length > 13){
    throw new BadRequestError('Id number must be 13 characters')
  }

  const user = await User.create(req.body);
  res.status(200).json({ user });
};

const getUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users, count: users.length})
};

module.exports = {
  createUser,
  getUsers
}
