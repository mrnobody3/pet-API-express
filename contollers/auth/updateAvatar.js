const { uploadImage, HttpError } = require("../../helpers")
const { User } = require("../../models/auth")
const updateAvatar = async (req, res) => {
  const { _id } = req.user

  let avatar = null

  if (req.file) {
    const { path: tempDir } = req.file
    const result1 = await uploadImage(tempDir)
    avatar = result1.secure_url
  }

  const result = await User.findByIdAndUpdate(_id, {
    avatarUrl: avatar,
  })

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result)
}

module.exports = updateAvatar
