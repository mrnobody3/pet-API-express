const express = require("express");

const router = express.Router();
const {add} = require("../../contollers/books")

router.post("/add", add)

module.exports = router;