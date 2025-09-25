//registerRoutes.js
import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { loginUser } from "../controllers/authController.js"; 
import { getProfile } from "../controllers/profileController.js";

const router = express.Router();

//register page
router.get("/register", (req, res) => {
    res.redirect("register");
});

//handle register
router.post("/register", registerUser);

//handle login
router.post("/login", loginUser);

//get user profile
router.get("/profile", getProfile);

export default router;