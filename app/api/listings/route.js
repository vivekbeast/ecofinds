import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });
  return Response.json(products);
}


export async function POST(req) {
  await dbConnect();
  const user = verifyToken(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newProduct = await Product.create({
    ...body,
    owner: user.id,
  });

  return Response.json(newProduct);
}
