const express = require("express");
const {
	addUser,
	loginUser,
	getCurrent,
	logout,
	updateAvatar
} = require("../../contollers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/auth");
const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), controllerWrapper(addUser));
//signin
router.post("/login", validateBody(schemas.loginSchema), controllerWrapper(loginUser));

router.get("/current", authenticate, controllerWrapper(getCurrent));

router.post("/logout", authenticate, controllerWrapper(logout));

// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
// upload.array("cover", 8) => req.files
router.post("/avatar",  upload.single("avatar"), controllerWrapper(updateAvatar))

module.exports = router;