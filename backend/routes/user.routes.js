import { Router } from "express";
import { forgetPasswordController, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatar, userDetails, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";
const router = Router();

router.post('/register', registerUserController)
router.post('/verify-email', verifyEmailController)
router.post('/login', loginController);
router.get('/logout', authMiddleware,  logoutController)
router.put('/upload-avatar', authMiddleware, upload.single('avatar') ,uploadAvatar)
router.put('/update-user', authMiddleware, updateUserDetails)
router.put('/forgot-password', forgetPasswordController)
router.put('/verify-forgot-password', verifyForgotPasswordOtp)
router.put('/reset-password', resetPassword)
router.post('/refresh-token', refreshToken);
router.get('/user-details', authMiddleware, userDetails);

export default router;