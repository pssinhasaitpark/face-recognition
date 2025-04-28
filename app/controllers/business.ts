import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Business } from "../models/index";

import asyncHandler from "../utils/asyncHandler";

const SECRET_KEY = process.env.SECRET_KEY || "adfaufasdfasdfiadsufhasdfuiasd";



export const registerBusiness = asyncHandler(
    async (req: Request, res: Response) => {
     
    }
  );
  
  