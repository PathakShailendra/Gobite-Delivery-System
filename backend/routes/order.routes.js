import { Router } from 'express'
import authMiddleware from "../middleware/auth.middleware.js";
import express from "express";
import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js';



const router = Router()

router.post("/cash-on-delivery",authMiddleware,CashOnDeliveryOrderController)
router.post('/checkout', authMiddleware, paymentController)
router.post('/webhook', webhookStripe)
router.get("/order-list",authMiddleware,getOrderDetailsController)



export default router