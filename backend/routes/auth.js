import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    // Validar campos requeridos
    if (!req.body.email || !req.body.password || !req.body.userFullName) {
      return res.status(400).json({ 
        error: "Email, password, and full name are required" 
      });
    }

    // Verificar si el usuario ya existe (por email, admissionId o employeeId)
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        ...(req.body.admissionId ? [{ admissionId: req.body.admissionId }] : []),
        ...(req.body.employeeId ? [{ employeeId: req.body.employeeId }] : [])
      ]
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: "User already exists with this email, admission ID, or employee ID" 
      });
    }

    /* Salting and Hashing the Password */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    /* Create a new user */
    const newuser = await new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newuser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        userType: user.userType,
        userFullName: user.userFullName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ 
      error: "Internal server error during registration" 
    });
  }
});

/* User Login */
router.post("/signin", async (req, res) => {
  try {
    console.log(req.body, "req");
    
    // Validar campos requeridos
    if (!req.body.password || (!req.body.admissionId && !req.body.employeeId)) {
      return res.status(400).json({ 
        error: "Password and either admission ID or employee ID are required" 
      });
    }

    const user = req.body.admissionId
      ? await User.findOne({
          admissionId: req.body.admissionId,
        })
      : await User.findOne({
          employeeId: req.body.employeeId,
        });

    console.log(user, "user");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ error: "Wrong Password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userType: user.userType,
        userFullName: user.userFullName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      error: "Internal server error during login" 
    });
  }
});

export default router;
