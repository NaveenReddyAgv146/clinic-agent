import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

const sendAuth = (res, user) => {
  const token = generateToken(user)
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    },
  })
}

export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  const { name, email, password, phone } = req.body
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'Email already registered' })

  const user = await User.create({ name, email, password, phone })
  res.status(201)
  sendAuth(res, user)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  sendAuth(res, user)
}

export const me = async (req, res) => {
  res.json(req.user)
}

export const updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone,
    avatar: req.body.avatar,
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
  res.json(user)
}
