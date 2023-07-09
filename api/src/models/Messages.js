const {Schema, model} = require('mongoose')

const Messages = new Schema({
    sender_id: String,
    message: {
        text: String,
        image: String,
        audio: String
    },
    date: Number,
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'conversations'
    },
    is_check: {
        type: Boolean,
        default: false
    }
}, {versionKey: false})

module.exports = model('messages', Messages)