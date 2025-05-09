import {Router} from 'express';
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/subCategory.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = Router();

router.post('/create', authMiddleware, AddSubCategoryController);
router.post('/get',  getSubCategoryController)
router.put('/update', authMiddleware, updateSubCategoryController)
router.delete('/delete', authMiddleware, deleteSubCategoryController)



export default router;