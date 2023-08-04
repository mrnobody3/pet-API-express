const express = require("express")
const { controllerWrapper } = require("../../helpers")
const { validateBody, authenticate, upload } = require("../../middlewares")
const { updateAvatar } = require("../../contollers/auth")

const router = express.Router()

router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(updateAvatar),
)
