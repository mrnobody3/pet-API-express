const express = require("express");
const { controllerWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();
const { add, remove, getAll } = require("../../contollers/books");

router.get("/", authenticate, controllerWrapper(getAll))
router.post("/add", authenticate, add)
router.delete("/remove/:id", authenticate, controllerWrapper(remove))

module.exports = router;