// pages/api/cart.js (or app/api/cart/route.js in App Router)
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await dbConnect();
  const user = verifyToken(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  let cart = await Cart.findOne({ user: user.id }).populate("items.product").lean();
  if (!cart) {
    cart = { user: user.id, items: [] };
  }

  return new Response(JSON.stringify(cart), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const user = verifyToken(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { productId, quantity } = await req.json();
  if (!productId) return new Response(JSON.stringify({ error: "Product required" }), { status: 400 });

  let cart = await Cart.findOne({ user: user.id });

  if (!cart) {
    cart = await Cart.create({ user: user.id, items: [{ product: productId, quantity }] });
  } else {
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  cart = await cart.populate("items.product");
  return new Response(JSON.stringify(cart), { status: 200 });
}

export async function DELETE(req) {
  await dbConnect();
  const user = verifyToken(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { productId } = await req.json();
  if (!productId) return new Response(JSON.stringify({ error: "Product required" }), { status: 400 });

  let cart = await Cart.findOne({ user: user.id });
  if (!cart) return new Response(JSON.stringify({ error: "Cart empty" }), { status: 400 });

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();
  cart = await cart.populate("items.product");

  return new Response(JSON.stringify(cart), { status: 200 });
}
