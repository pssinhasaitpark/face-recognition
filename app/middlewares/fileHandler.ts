import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import path from "path";
import fs from "fs";
import multer from "multer";
import sharp from "sharp";



export const fileUploader = asyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
        const BASE_PATH = path.join(__dirname, "../uploads");

        if (!fs.existsSync(BASE_PATH)) {
            fs.mkdirSync(BASE_PATH, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, BASE_PATH);
            },

            filename: function (req, file, cb) {
                const fileNameWithoutExt = path.parse(file.originalname).name;
                cb(null, fileNameWithoutExt + Date.now() + ".webp");
            },
        });

        const fileFilter = (req: any, file: any, cb: any) => {
            cb(null, true);
        };

        const upload = multer({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 1024 * 5 },
            fileFilter: fileFilter,
        });

        upload.single("file")(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: "File upload failed." });
            }

            if (!req.file) {
                return res.status(400).send({ message: "No file was uploaded." });
            }

            const uploadedFilePath = path.join(__dirname, "../uploads", req.file.filename);
            
            const webpFileName = Date.now() + ".webp";
            const webpFilePath = path.join(__dirname, "../uploads", webpFileName);

            try {
                await sharp(uploadedFilePath).webp({ quality: 80 }).toFile(webpFilePath);

                fs.unlinkSync(uploadedFilePath);

                (req.file as any).webpPath = webpFilePath;

                next();
            } catch (error) {
                console.error("Error converting image to webp:", error);
                return res.status(500).send({ message: "Failed to convert image." });
            }
        });
    }
);
