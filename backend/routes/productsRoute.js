import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProducts, getProductsById, getTopProducts, updateProduct } from '../controlers/productsControler.js'
import { admin, protect } from '../middleare/authMiddleware.js'


const router = express.Router()


router.get('/top', getTopProducts)

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)



export default router