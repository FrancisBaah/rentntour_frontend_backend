const pool = require("../db");

const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const insertQuery = `
      INSERT INTO contact_messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [name, email, message]);

    res.status(200).json({
      success: true,
      message: "Message saved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
};

const getMails = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = { sendMail, getMails };
