const express = require("express")
const { controllerWrapper } = require("../../helpers")
const { authenticate, upload } = require("../../middlewares")
const { updateAvatar } = require("../../contollers/user")

const router = express.Router()

// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
// upload.array("cover", 8) => req.files
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(updateAvatar),
)

module.exports = router
