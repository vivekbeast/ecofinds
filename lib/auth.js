/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization"); // "Bearer token"
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // contains { id, email }
  } catch (err) {
    return null;
  }
}
