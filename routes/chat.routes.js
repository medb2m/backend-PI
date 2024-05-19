import express from 'express'
import { addMessage , getAll } from '../controllers/chat.controller.js'
import authorize from '../_middleware/authorize.js'

const router = express.Router()

router.post('/add', authorize(), addMessage)
router.get('/', authorize(), getAll)

export default router;