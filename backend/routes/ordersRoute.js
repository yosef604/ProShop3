import express from 'express'
import { addOrderItems, getOrderBiId, updateOrderToPaid } from '../controlers/orderControler.js'
import { protect } from '../middleare/AuthMiddlewarw.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderBiId)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router
