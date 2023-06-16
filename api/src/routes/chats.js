const {Router} = require('express')
const { getMessages, sendMessage } = require('../controllers/chat/messages')
const { getAllUsers } = require('../controllers/user')
const route = Router()

route.get('/messages/:idConversation', async(req, res)=>{
    const {idConversation} = req.params
    try {
        const messages = await getMessages(idConversation)
        return res.send(messages)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})

route.post('/messages', async (req, res)=>{
    const {is_group, members_id, sender_id, message} = req.body
    const {id_conversation} = req.query
    try {
        const conversation = await sendMessage(sender_id, members_id, is_group, id_conversation, message)
        return res.send(conversation)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})


route.get('/users', async(req, res)=>{
    try {
        const users = await getAllUsers()
        return res.send(users)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})

module.exports = route