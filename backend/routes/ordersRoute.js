import express from 'express'
import { addOrderItems, getOrderBiId } from '../controlers/orderControler.js'
import { protect } from '../middleare/AuthMiddlewarw.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderBiId)


export default router
