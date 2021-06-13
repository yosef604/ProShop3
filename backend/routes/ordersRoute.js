import express from 'express'
import { addOrderItems, getOrderBiId, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDeliverd } from '../controlers/orderControler.js'
import { admin, protect } from '../middleare/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderBiId)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliverd)


export default router
