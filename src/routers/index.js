const express = require("express");
const router = express.Router();
const V1Api = require("./v1/index");

router.use('/v1',V1Api);

module.exports = router;