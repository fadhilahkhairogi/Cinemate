//profileController.js
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
// GET /profile
export async function getProfile(req, res) {
    const authHeader = req.headers.authorization;   
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ["password"] },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
    }
}