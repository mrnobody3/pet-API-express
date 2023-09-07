const fs = require("fs")
const { uploadImage, HttpError } = require("../../helpers")

const { User } = require("../../models/auth")
const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempDir } = req.file

  let avatar = null

  if (req.file) {
    const uploadedImg = await uploadImage(tempDir)
    avatar = uploadedImg.secure_url
  }

  // deleting file from temp
  fs.unlinkSync(tempDir)

  const result = await User.findByIdAndUpdate(_id, {
    avatarUrl: avatar,
  })

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result)
}

module.exports = updateAvatar
