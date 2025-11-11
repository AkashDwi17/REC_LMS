// import { app } from "./app.js";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
//   api_key: process.env.CLOUDINARY_CLIENT_API,
//   api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });


import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import app from "./app.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
  console.log("✅ Database connected successfully");
});
