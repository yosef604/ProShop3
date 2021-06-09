import express from 'express'
import { addOrderItems } from '../controlers/orderControler.js'
import { protect } from '../middleare/AuthMiddlewarw.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)


export default router
