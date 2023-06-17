const {Schema, model} = require('mongoose')

const Conversation = new Schema({
    is_group: Boolean,
    users_id: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    // messages: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'messages'
    // }]
    messages_user: [
        {
        user_id: String,
        messages_id:[ {
            type: Schema.Types.ObjectId,
            ref: 'messages'
            }]
        }
    ]
}, {versionKey: false})

module.exports =  model('conversations', Conversation)
