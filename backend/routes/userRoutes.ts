// Package Imports
import express from "express"

// Controllers Imports
import { loginUser, profileData, registerUser } from "../controllers/userControllers"

// Utilis Import
import { authCheck } from "../utils/authCheck"


const router = express.Router()

// Public Routes
router.post("/register", registerUser)
router.post("/login",loginUser)

// Private Routes
router.get("/user/profile",authCheck, profileData)





export default router