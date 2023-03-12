const User = require('../models/User')
const {BadRequestError} = require('../errors')

const createUser = async (req, res) => {
  const {name, surname, idNo, dateOfBirth} = req.body

  const specialCharacterRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const user = await User.findOne({ idNo })

  if(user){
    throw new BadRequestError(`User with ${idNo} already exist`)
  }

  if(idNo.toString().length !== 13){
    throw new BadRequestError(`Id number must be 13 characters`)
  }

  if(!name){
    throw new BadRequestError(`Please provide name`)
  }

  if(!specialCharacterRegex.test(name)){
    throw new BadRequestError(`Please provide valid name with no special characters`)
  }

  if(!surname){
    throw new BadRequestError(`Please provide surname`)
  }

  if(!specialCharacterRegex.test(surname)){
    throw new BadRequestError(`Please provide valid surname with no special characters`)
  }

  const dateRegex = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
  // Test if the input matches the date format
  if (!dateRegex.test(dateOfBirth)) {
    throw new BadRequestError(`Date format must be dd/mm/YYYY`)
  }

  const newUser = await User.create(req.body);
  res.status(200).json({ newUser });
};

const getUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users, count: users.length})
};

module.exports = {
  createUser,
  getUsers
}
