/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(JSON.stringify({ token, user: { id: user._id, email: user.email, username: user.username } }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ user }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}