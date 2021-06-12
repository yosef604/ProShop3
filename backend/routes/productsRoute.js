import express from 'express'
import { deleteProduct, getProducts, getProductsById } from '../controlers/productsControler.js'
import { admin, protect } from '../middleare/authMiddleware.js'


const router = express.Router()


router.route('/').get(getProducts)

router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct)



export default router