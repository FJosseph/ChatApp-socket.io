const app = require('./src/app')
const mongoose = require('mongoose')
// Configuración Socket.io
const { Server: WebSocketServer } = require('socket.io')
const http = require('http')
const { sendMessage } = require('./src/controllers/chat/messages')
const { Conversation } = require('./src/db')
const { Schema } = require('mongoose')

const server = http.createServer(app)
const io = new WebSocketServer(server, {
    cors: {
        origin: '*'
    }
})


// Functionality Socket.io
io.on('connect', (socket)=>{
    console.log(socket.id);
    socket.on('client:new-message', async(data)=>{
        const {user, userCurrent, message} = data
        // db.miColeccion.find({ miPropiedad: { $in: ["miValor"] } })
        // const createConversation = new Conversation({
        //     users_id: [user, userCurrent],
        //     messages: []
        // })
        // await createConversation.save()
        // const newMessage = await sendMessage(user, message,  conversation,userCurrent)
        // console.log(newMessage);
        // socket.emit('server:new-message', newMessage)
    })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, ()=>console.log('% Server listen at %', PORT))
