import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CategorySchema);
