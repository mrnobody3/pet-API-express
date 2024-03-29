const { User } = require("../../models/auth")
const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" })
  res.json({ message: "Logout success" })
}

module.exports = logout
