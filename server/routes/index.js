const express = require("express");
const router = express.Router();

const shipRouter = require("./ship");

router.use("/ships", shipRouter);

module.exports = router;
