// models/UserListing.js
import mongoose from "mongoose";

const UserListingItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserListingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true }, // userId from localStorage
    items: [UserListingItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.UserListing || mongoose.model("UserListing", UserListingSchema);
