import asyncHandler from 'express-async-handler'
import User from '../models/UsersModel.js'
import { generateToken } from '../utils/generateToken.js'


//@desc   Auth user & get token
//@route   POST /api/users/login
//@daccess   Public
export const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc   Register a new user
//@route   POST /api/users
//@daccess   Public
export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    const userExist = await User.findOne({email})

    if (userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    const newUser = await User.create({
        name, email, password
    })

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//@desc   Get user profile
//@route   GET /api/users/login
//@daccess   Public
export const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@desc   Update user profile
//@route   PUT /api/users/profile
//@daccess   Privet
export const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@desc   Get all users
//@route   GET /api/users
//@daccess   Privet/Admin
export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    res.json(users)
})