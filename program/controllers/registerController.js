//registerController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

// POST /register
export async function registerUser(req, res) {
  const { name, username, email, password } = req.body;
    const errors = [];
    if (!name || !username || !email || !password) {
        errors.push({ msg: "Please fill in all fields" });
    }
    if (password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });

        if (existingUser) {
            const conflicts = [];
            if (existingUser.username === username) {
                conflicts.push({ msg: "Username is already taken" });
            }
            if (existingUser.email === email) {
                conflicts.push({ msg: "Email is already registered" });
            }
            return res.status(409).json({ errors: conflicts });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            userId: newUser.id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

