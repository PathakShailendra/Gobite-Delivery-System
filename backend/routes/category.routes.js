import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";
const router = Router();

router.post("/add-category", authMiddleware, AddCategoryController);
router.get('/get', getCategoryController);
router.put('/update', updateCategoryController)
router.delete('/delete', deleteCategoryController);


export default router;