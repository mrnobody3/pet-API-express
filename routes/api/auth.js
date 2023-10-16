const express = require("express");
const {
  refresh,
  addUser,
  loginUser,
  getCurrent,
  logout,
} = require("../../contollers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/auth");
const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     description: Register new user
 *     requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserSchema'
 *
 *           text/plain:
 *             schema:
 *               type: string
 *     responses:
 *       201:
 *         description: Success
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 *
 */
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(addUser),
);

//signin
/**
 *
 * */
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(loginUser),
);

router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  controllerWrapper(refresh),
);

router.get("/current", authenticate, controllerWrapper(getCurrent));

router.get("/logout", authenticate, controllerWrapper(logout));

module.exports = router;
