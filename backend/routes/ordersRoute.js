import express from 'express'
import { addOrderItems, getOrderBiId, updateOrderToPaid, getMyOrders } from '../controlers/orderControler.js'
import { protect } from '../middleare/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderBiId)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router
