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
 *     tags:
 *     - Auth
 *     summary: Register new user
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: jane.doe@example.com
 *               name:
 *                 type: string
 *                 default: Jane Doe
 *               password:
 *                 type: string
 *                 default: stringPassword123
 *     responses:
 *       201:
 *         description: Success
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 */
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(addUser),
);

//signin
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: jane.doe@example.com
 *               password:
 *                 type: string
 *                 default: stringPassword123
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: jane.doe@example.com
 *                 avatarUrl:
 *                   type: string
 *                   example: https://example.com/avatar/jane_doe.jpg
 *                 name:
 *                   type: string
 *                   example: John Snow
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 */
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(loginUser),
);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 */
router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  controllerWrapper(refresh),
);

/**
 * @openapi
 * /api/auth/current:
 *   get:
 *     tags:
 *     - Auth
 *     summary: Get current user
 */
router.get("/current", authenticate, controllerWrapper(getCurrent));

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     tags:
 *     - Auth
 *     summary: Log out user
 */
router.get("/logout", authenticate, controllerWrapper(logout));

module.exports = router;
