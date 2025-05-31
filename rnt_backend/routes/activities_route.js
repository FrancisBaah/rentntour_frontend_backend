const express = require("express");
const {
  getActivities,
  getActivityById,
} = require("../controllers/activities_controller");
const router = express.Router();

// router.post("/", createSupplier); // Create a new supplier
router.get("/", getActivities);
router.get("/:id", getActivityById);
// router.put("/:SupplierID", updateSupplier); // Update an existing supplier
// router.delete("/:SupplierID", deleteSupplier); // Delete a supplier

module.exports = router;
