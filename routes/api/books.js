const express = require("express");
const { controllerWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();
const { add, remove, getAll } = require("../../contollers/books");

/**
 * @openapi
 * /api/books/:
 *   get:
 *     tags:
 *     - Books
 *     summary: Get all books of current user
 */
router.get("/", authenticate, controllerWrapper(getAll));

/**
 * @openapi
 * /api/books/add:
 *   post:
 *     tags:
 *     - Books
 *     summary: Add book for users library
 */
router.post("/add", authenticate, add);

/**
 * @openapi
 * /api/books/remove/:id:
 *   delete:
 *     tags:
 *     - Books
 *     summary: Delete book with id
 */
router.delete("/remove/:id", authenticate, controllerWrapper(remove));

module.exports = router;
