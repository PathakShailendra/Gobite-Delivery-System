import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadImageController from "../controllers/uploadImage.Controller.js"
import upload from "../middleware/multer.js";

const router = Router();

router.post('/upload', authMiddleware, upload.single('image'),uploadImageController)

export default router;