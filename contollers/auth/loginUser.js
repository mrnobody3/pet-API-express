const bcrypt = require("bcryptjs")
const { User } = require("../../models/auth")
const { HttpError, createTokens } = require("../../helpers")

const loginUser = async (req, res) => {
  const { password, email } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, "Email or password invalid")
  }

  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid")
  }

  const tokens = createTokens(user._id)
  await User.findByIdAndUpdate(user._id, { ...tokens })
  user = await User.findById(user._id, {
    accessToken: 1,
    refreshToken: 1,
    email: 1,
    _id: 1,
    name: 1,
    avatarUrl: 1,
  })

  res.json(user)
}

module.exports = loginUser
