// pages/api/products.js
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  let products;
  if (userId) {
    // Fetch products listed by this user only
    products = await Product.find({ owner: userId }).sort({ createdAt: -1 });
  } else {
    // Fetch all products
    products = await Product.find().sort({ createdAt: -1 });
  }

  return Response.json(products);
}
