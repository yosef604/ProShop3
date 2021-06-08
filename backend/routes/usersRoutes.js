import express from 'express'
import { authUser, getUserProfile } from '../controlers/usersControlers.js'
import { protect } from '../middleare/AuthMiddlewarw.js'

const router = express.Router()


router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)




export default router
