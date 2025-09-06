import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   // maps to `name` in your demo data
    description: String,
    category: String,
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, default: "/placeholder.png" },
    condition: { type: String },
    sustainability: { type: String },
    rating: { type: Number, default: 0 },
    seller: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
