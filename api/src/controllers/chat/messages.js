const { isValidObjectId } = require("mongoose");
const { Message, User, Conversation } = require("../../db");

const sendMessage = async (
  sender_id,
  members_id,
  is_group,
  conversation_id = null,
  message
) => {
  // Creación de la conversación si no existe
  if (!conversation_id) {
    // const user =  await User.find({
    //   _id: {
    //     $in: [...members_id]
    //   }
    // })
    // const usersData = user.reduce((a,b)=>{a[b._id] = b.conversations_id
    //  return a},{})
    // console.log('data', usersData);

    const newConversation = new Conversation({
      users_id: [...members_id],
      is_group
    });

    const chat = new Message({
      sender_id,
      conversation_id: newConversation._id,
      message,
      date: new Date().getTime(),
    });
    // Agregar el id del mensaje nuevo a la conversation
    newConversation.last_message = chat._id  
    newConversation.last_date = new Date().getTime()
    // newConversation.messages = [].concat(chat._id);
    newConversation.messages_user = members_id.map(x=>({
      user_id: x,
      messages_id: [].concat(chat._id)
    }));
    // Vinculamos las conversationes con los usuarios
    await User.updateMany({
      _id: {
        $in: [...members_id]
      }
    }, {
      $push: {
        "conversations_id": newConversation._id
      }
    })
    await chat.save();
    await newConversation.save();
    return chat;
  }

  // Adición del chat a la conversación si existe
  const conversation = await Conversation.findById(conversation_id);
  const chat = new Message({
    sender_id,
    conversation_id: conversation._id,
    message,
    date: new Date().getTime(),
  });
  // conversation.messages_user = conversation.messages_user.concat(chat._id)
  conversation.messages_user = conversation.messages_user.map(x=>({...x, messages_id: x.messages_id.concat(chat._id)}))
  // Agregar el id del mensaje nuevo a la conversation
  conversation.last_message = chat._id
  conversation.last_date = new Date().getTime()
  await conversation.save()
  await chat.save();
  return chat;
};

const getMessages = async(idConversation, id_user=null)=>{
  if(id_user){
    if(!isValidObjectId(idConversation)) throw new Error('No es un id válido')
    const chatsByUser = await Conversation.findById(idConversation, {
      users_id: 1,
      is_group: 1,
      messages_user: {
        $elemMatch: {
          user_id: id_user
        }
      }
    })
    // return chatsByUser.populate({
    //   path: 'messages_user.messages_id'
    // })
    if(!chatsByUser) throw new Error("There isn't conversations!")
    return chatsByUser.populate(['messages_user.messages_id', {path: 'users_id', select: ['_id', 'firstname', 'lastname', 'username']}])
    // return chatsByUser
  }
  const chats = await Conversation.findById(idConversation)
  if(!chats) return []
  // return chats.populate(['messages'])
  return chats
}

module.exports = {
  sendMessage,
  getMessages
}