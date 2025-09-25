//authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

// POST /login
export async function loginUser(req, res) {
    const { username, password } = req.body;
    const errors = [];
    if (!username || !password) {
        errors.push({ msg: "Please fill in all fields" });
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Username doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }   
        const token = jwt.sign(
            { userId: user.UserId, username: user.username, role: user.role },
            process.env.JWT_SECRET,
        );
        res.json({ token, user: { id: user.UserId, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}