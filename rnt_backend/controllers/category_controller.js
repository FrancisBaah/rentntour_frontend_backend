const pool = require("../db");
const asyncHandler = require("express-async-handler");
const getCategory = asyncHandler(async (req, res) => {
  // Default query to fetch all category
  let query = `SELECT * FROM category`;

  try {
    const result = await pool.query(query);

    // Check if the result has rows
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No category found." });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category." });
  }
});

module.exports = {
  getCategory,
};
