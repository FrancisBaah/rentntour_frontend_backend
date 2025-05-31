const pool = require("../db");
const asyncHandler = require("express-async-handler");

const addBooking = asyncHandler(async (req, res) => {
  const {
    experienceId,
    experienceTitle,
    optionTitle,
    from,
    to,
    people,
    totalPrice,
    fullName,
    phone,
    email,
  } = req.body;

  if (!experienceId || !experienceTitle || !from || !to || !people) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO bookings (
        experience_id,
        experience_title,
        option_title,
        from_date,
        to_date,
        people,
        total_price,
        status,
        full_name,
        phone,
        email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
      `,
      [
        experienceId,
        experienceTitle,
        optionTitle,
        from,
        to,
        people,
        totalPrice,
        "pending",
        fullName,
        phone,
        email,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

const getBooking = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
});

const getPopularActivities = asyncHandler(async (req, res) => {
  const query = `
    SELECT DISTINCT ON (a.id)
      a.id AS activity_id,
      a.name AS activity_name,
      a.about,
      a.inclusion,
      a.important_info,
      a.city_id,
      c.id AS category_id,
      c.name AS category_name,
      COUNT(b.id) OVER (PARTITION BY a.id) AS booking_count,
      ip.url AS image_url
    FROM activity a
    JOIN category c ON a.category_id = c.id
    LEFT JOIN bookings b ON a.id = b.experience_id
    LEFT JOIN image_path ip ON a.id = ip.activity_id
    ORDER BY a.id, ip.order ASC
    LIMIT 15;
  `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching popular activities:", error.message);
    res.status(500).json({ message: "Failed to fetch popular activities." });
  }
});

module.exports = { addBooking, getBooking, getPopularActivities };
