const {Router} = require('express')
const router = Router()

const login = require('./login')
const chat = require('./chats')
const contact = require('./contacts')
// Login
router.use('/', login)
// Contacts
router.use('/contact', contact)
router.use('/chat', chat)

module.exports = router