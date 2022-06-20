
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid E-mail or Password')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid E-mail or Password')
    } 
    const token = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn:'1d' })

    res.status(StatusCodes.OK).json({ username:user.username, id:user._id, token })
}


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    if(!user) {
        throw new BadRequestError('email is taken')
    }    
    res.status(StatusCodes.CREATED).json({ name: user.email })
        
    
}



module.exports = { login, register }