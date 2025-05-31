const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: [
      "http://172.164.249.202/",
      "http://localhost:5174",
      "https://rentntour.com",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/activities", require("./routes/activities_route"));
app.use("/category", require("./routes/category_route"));
app.use("/contact", require("./routes/contact_route"));
app.use("/booking", require("./routes/booking_route"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
