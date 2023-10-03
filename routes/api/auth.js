const express = require("express")
const {
  refresh,
  addUser,
  loginUser,
  getCurrent,
  logout,
} = require("../../contollers/auth")
const { controllerWrapper } = require("../../helpers")
const { validateBody, authenticate } = require("../../middlewares")
const { schemas } = require("../../models/auth")
const router = express.Router()

//signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(addUser),
)
//signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(loginUser),
)

router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  controllerWrapper(refresh),
)

router.get("/current", authenticate, controllerWrapper(getCurrent))

router.get("/logout", authenticate, controllerWrapper(logout))

module.exports = router
