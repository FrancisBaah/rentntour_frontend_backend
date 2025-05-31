const express = require("express");
const { getMails, sendMail } = require("../controllers/contact");
const router = express.Router();

router.get("/", getMails);
router.post("/", sendMail);

module.exports = router;
