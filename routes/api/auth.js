const express = require('express');
const router = express.Router();
const axios = require("axios")

router.get("/", (req, res) => res.send("auth route"))
module.exports = router 