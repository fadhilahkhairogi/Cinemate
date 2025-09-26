//authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../models/accessToken.js";

// POST /login
export async function loginUser(req, res) {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }
    try {
        //check user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }   

        //generate JWT
        const expiresAt = new Date(Date.now() +  24 * 60 * 60 * 1000); //exp 1 day

        const token = jwt.sign(
            { userId: user.UserId, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        //save to db
        await Token.create({
            userId: user.UserId,
            token,
            expiresAt,
            revoked: false,
        });

        //respond in json
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.UserId,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}