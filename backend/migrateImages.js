import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Item from "./modals/itemModal.js";
import cloudinary from "./config/cloudinary.js";

dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const items = await Item.find({
      imageUrl: { $regex: "^/uploads" }
    });

    console.log(`Found ${items.length} items to migrate`);

    for (const item of items) {
      const filename = path.basename(item.imageUrl);
      const localPath = path.join("uploads", filename);

      if (!fs.existsSync(localPath)) {
        console.log(`File not found: ${localPath}`);
        continue;
      }
try{
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "farmleaf",
        transformation: [
    { width: 1000, crop: "limit" },
    { quality: "auto" }
  ]
      });

      item.imageUrl = result.secure_url;
      await item.save();

      console.log(`Migrated: ${item.name}`);
    }
catch(uploadError){
      console.error(`Upload Error for ${item.name}:`, uploadError);
    }}
    console.log("Migration Complete!");
    process.exit();
  } catch (error) {
    console.error("Migration Error:", error);
    process.exit(1);
  }
};

migrate();
