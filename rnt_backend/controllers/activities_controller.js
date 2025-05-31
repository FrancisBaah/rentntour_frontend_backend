const pool = require("../db");
const asyncHandler = require("express-async-handler");
// const createSupplier = asyncHandler(async (req, res) => {
//   const { BusinessID, Name, ContactName, Phone, Email, Address } = req.body;

//   // Validate required fields
//   if (!BusinessID || !Name || !ContactName || !Phone || !Email || !Address) {
//     return res
//       .status(400)
//       .json({ message: "Missing required supplier information." });
//   }

//   const query = `
//       INSERT INTO Activities(BusinessID, Name, ContactName, Phone, Email, Address)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING SupplierID
//     `;

//   try {
//     await pool.query(query, [
//       BusinessID,
//       Name,
//       ContactName,
//       Phone,
//       Email,
//       Address,
//     ]);
//     res.status(201).json({
//       message: "Supplier created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating supplier:", error);
//     res.status(500).json({ message: "Failed to create supplier" });
//   }
// });
const getActivities = asyncHandler(async (req, res) => {
  const query = `
    SELECT 
      a.id AS activity_id,
      a.name AS activity_name,
      a.about,
      a.inclusion,
      a.important_info,
      a.city_id,
      c.id AS category_id,
      c.name AS category_name,
      ao.adult_price as price,
      ip.url,
      ip.order,
      ao.title as activity_title
    FROM activity a
    LEFT JOIN activity_option ao ON a.id = ao.activity_id
    LEFT JOIN image_path ip ON a.id = ip.activity_id
    JOIN category c ON a.category_id = c.id;
  `;

  try {
    const result = await pool.query(query);
    console.log("Fetched rows:", result.rows.length);
    console.log(result.rows[0]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No activities found." });
    }

    // Group by category and then by activity within each category
    const grouped = result.rows.reduce((acc, row) => {
      const {
        category_id,
        category_name,
        activity_id,
        activity_name,
        about,
        inclusion,
        important_info,
        city_id,
        price,
        activity_title,
        url,
        order,
      } = row;

      if (!acc[category_id]) {
        acc[category_id] = {
          category_id,
          category_name,
          activities: [],
        };
      }

      const existingActivity = acc[category_id].activities.find(
        (act) => act.activity_id === activity_id
      );

      if (existingActivity) {
        // Add option if not already added
        if (
          !existingActivity.options.some(
            (opt) => opt.title === activity_title && opt.price === price
          )
        ) {
          existingActivity.options.push({
            title: activity_title,
            price,
          });
        }

        // Add image if not already added
        if (
          !existingActivity.image.some(
            (img) => img.url === url && img.order === order
          )
        ) {
          existingActivity.image.push({
            url,
            order,
          });
        }
      } else {
        acc[category_id].activities.push({
          activity_id,
          activity_name,
          about,
          inclusion,
          important_info,
          city_id,
          options: [
            {
              title: activity_title,
              price,
            },
          ],
          image: [
            {
              url,
              order,
            },
          ],
        });
      }

      return acc;
    }, {});

    // Convert grouped object to array
    const groupedArray = Object.values(grouped);

    res.status(200).json(groupedArray);
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    res.status(500).json({ message: "Failed to fetch activities." });
  }
});

const getActivityById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      a.*, ao.title AS option_title, ao.adult_price, ip.url, ip.order
    FROM activity a
    LEFT JOIN activity_option ao ON a.id = ao.activity_id
    LEFT JOIN image_path ip ON a.id = ip.activity_id
    WHERE a.id = $1;
  `;

  try {
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const base = result.rows[0];
    const activity = {
      id: base.id,
      name: base.name,
      about: base.about,
      inclusion: base.inclusion,
      important_info: base.important_info,
      city_id: base.city_id,
      category_id: base.category_id,
      options: [],
      images: [],
    };

    const optionSet = new Set();
    const imageSet = new Set();

    result.rows.forEach((row) => {
      if (
        row.option_title &&
        row.adult_price &&
        !optionSet.has(row.option_title)
      ) {
        activity.options.push({
          title: row.option_title,
          price: row.adult_price,
        });
        optionSet.add(row.option_title);
      }

      if (row.url && row.order !== undefined && !imageSet.has(row.url)) {
        activity.images.push({
          url: row.url,
          order: row.order,
        });
        imageSet.add(row.url);
      }
    });

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading activity" });
  }
});

// const updateSupplier = asyncHandler(async (req, res) => {
//   const { SupplierID } = req.params;
//   const { BusinessID, Name, ContactName, Phone, Email, Address } = req.body;

//   // Ensure required fields are present
//   if (!BusinessID || !Name || !ContactName || !Phone || !Email || !Address) {
//     return res
//       .status(400)
//       .json({ message: "Missing required supplier information." });
//   }

//   const query = `
//       UPDATE Suppliers
//       SET BusinessID = $1, Name = $2, ContactName = $3, Phone = $4, Email = $5, Address = $6
//       WHERE SupplierID = $7
//       RETURNING SupplierID
//     `;

//   try {
//     const { rows } = await pool.query(query, [
//       BusinessID,
//       Name,
//       ContactName,
//       Phone,
//       Email,
//       Address,
//       SupplierID,
//     ]);

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Supplier not found to update." });
//     }

//     res.status(200).json({
//       message: "Supplier updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update supplier" });
//   }
// });
// const deleteSupplier = asyncHandler(async (req, res) => {
//   const { SupplierID } = req.params;

//   const query = `
//       DELETE FROM ActivitiesWHERE SupplierID = $1 RETURNING SupplierID
//     `;

//   try {
//     const { rows } = await pool.query(query, [SupplierID]);

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Supplier not found to delete." });
//     }

//     res.status(200).json({
//       message: "Supplier deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete supplier" });
//   }
// });

module.exports = {
  getActivities,
  getActivityById,
};
