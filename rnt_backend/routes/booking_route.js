const express = require("express");
const {
  addBooking,
  getBooking,
  getPopularActivities,
} = require("../controllers/booking");
const router = express.Router();

router.get("/", getBooking);
router.get("/popular", getPopularActivities);
router.post("/", addBooking);

module.exports = router;
