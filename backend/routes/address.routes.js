import { Router } from 'express'
import authMiddleware from "../middleware/auth.middleware.js";
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from '../controllers/address.controller.js';

const router = Router()

router.post('/create',authMiddleware,addAddressController)
router.get("/get",authMiddleware,getAddressController)
router.put('/update',authMiddleware,updateAddressController)
router.delete("/disable",authMiddleware,deleteAddresscontroller)



export default router
