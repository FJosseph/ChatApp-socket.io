require('dotenv').config()
const app = require('./src/app')
const mongoose = require('mongoose')
// Configuración Socket.io
const { Server: WebSocketServer } = require('socket.io')
const http = require('http')
const { sendMessage } = require('./src/controllers/chat/messages')
const { Conversation, Message } = require('./src/db')
const { Schema } = require('mongoose')

const server = http.createServer(app)
const io = new WebSocketServer(server, {
    cors: {
        origin: '*'
    }
})


// Functionality Socket.io
io.on('connection', (socket)=>{
    console.log('connect: ' + socket.id);
    // Evento desconexión
    // socket.on('disconnect', ()=>console.log('disconnect'))
    // Usuario conectado
    socket.on('setup', user=>{
        socket.join(user._id)
        // socket.broadcast.emit('connected', user._id)
    })
    // Unirse una room
    socket.on('join chat', (room)=>{
        socket.join(room)
        console.log('room: '+ room);
    })


    socket.on('client:new-message', (data)=>{
        // Envío de mensajes a un solo usuario
        // const {user, userCurrent, message, conversation_id = null, is_group = false} = data
        // console.log(data);
        // if(!data.hasOwnProperty('conversation_id')){
            // Primer mensaje
            // const response = await sendMessage(user, [user, userCurrent], is_group, conversation_id, message)
            // console.log(response);
        // }
        // Emitir evento en la roomp
        // socket.to(userCurrent).emit('server: new-message', response)
        // socket.to()
        const {data_message, users} = data
        socket.to(users.userCurrent).emit('server: new-message', data_message)
    })

    // Cambiar status del mensaje: is_check
    /**
     * @param {Array} userCurrent
     * @param {String} user
     * @param {String} message_id
     */
    socket.on('client:message_checked', async({users_id,message_by_conversation})=>{
        // const {_id} = data
        await Message.updateOne({
            _id: message_by_conversation.last_message._id
        }, {
            is_check: true
        })
        socket.to(users_id).emit('server:message_checked', message_by_conversation._id)
        // console.log('Verify message: ', user_id,users_id, message_id);
    })

    socket.off('setup', user=>{
        console.log(user);
    })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, ()=>console.log('% Server listen at %', PORT))
