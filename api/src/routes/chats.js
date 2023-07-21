const {Router} = require('express')
const { getMessages, sendMessage, createGroup } = require('../controllers/chat/messages')
const { getAllUsers } = require('../controllers/user')
const route = Router()

route.get('/messages/:idConversation', async(req, res)=>{
    const {idConversation} = req.params
    const {id_user} = req.query
    try {
        const messages = await getMessages(idConversation, id_user)
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

route.post('/new-group', async (req, res)=>{
    const {members_id, user_admin, name_group} = req.body
    try {
        const newGroup = await createGroup(members_id, user_admin, name_group)
        res.status(201).send({status: 'OK', newGroup})
    } catch (error) {
        res.status(404).json({message: error.message})
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