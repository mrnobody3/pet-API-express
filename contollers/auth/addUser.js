const { User } = require("../../models/auth")
const { HttpError } = require("../../helpers")
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")

const addUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw HttpError(409, "Email in use")
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const avatarUrl =
    avatar || gravatar.url(email, { s: "100", r: "x", d: "retro" })
  const newUser = await User.create({ name, email, password: hashedPassword })

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarUrl,
  })
}

module.exports = addUser
