const { User } = require("../../models/auth")
const getCurrent = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id, { password: 0 })
  res.json(user)
}

module.exports = getCurrent
