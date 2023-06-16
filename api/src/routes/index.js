const {Router} = require('express')
const router = Router()

const login = require('./login')
const chat = require('./chats')
// Login
router.use('/', login)
router.use('/chat', chat)

module.exports = router