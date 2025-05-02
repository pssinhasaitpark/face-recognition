import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Business, User } from "../models/index";

import asyncHandler from "../utils/asyncHandler";
import path from "path";
import { rekognition } from "../configs/aws";


const SECRET_KEY = process.env.SECRET_KEY || "adfaufasdfasdfiadsufhasdfuiasd";

// Registration
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Register Business
  if (req.body.role === 'business') {
    const { businessName, location, email, username, password, percentageOfDiscountOffered } = req.body;

    if (!businessName || !location || !email || !username || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const profile = req.file?.filename

    try {
      // Check if the user already exists
      const existingBusiness = await Business.findOne({ email });
      if (existingBusiness) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const existingUsername = await Business.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newBusiness = new Business({
        businessName,
        location,
        email,
        percentageOfDiscountOffered,
        username,
        password: hashedPassword,
        businessLogo: profile
      });

      await newBusiness.save();

      res.status(201).json({ message: "Business registered successfully!", newBusiness });
    } catch (error) {
      res.status(500).json({ message: "Server error. Please try again later." });
    }

  }
  // Register User
  else if (req.body.role === 'user') {

    const { firstName, lastName, email, username, password, role } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const profile = req.file?.filename

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        role,
        username,
        password: hashedPassword,
        profilePicture: profile
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  } else {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

);

// Login  
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.role === 'user') {
    try {
      const { imageBase64 } = req.body;
  
      const buffer = Buffer.from(imageBase64, 'base64');
  
      const params: AWS.Rekognition.DetectFacesRequest = {
        Image: {
          Bytes: buffer,
        },
        Attributes: ['ALL'],
      };
  
      const result = await rekognition.detectFaces(params).promise();
      res.json(result);
    } catch (error: any) {
      console.error('Rekognition Error:', error);
      res.status(500).json({ error: error.message });
    }

  }
  else
    if (req.body.role === 'business') {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Please enter both username and password." });
      }

      try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(400).json({ message: "User not found." });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(400).json({ message: "Incorrect password." });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful!", token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
      }
    }
});
