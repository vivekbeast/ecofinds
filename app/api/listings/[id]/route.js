import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id).lean();
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
  return Response.json(product);
}
