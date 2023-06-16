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
    newConversation.messages = [].concat(chat._id);
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
  conversation.messages = conversation.messages.concat(chat._id)
  await conversation.save()
  await chat.save();
  return chat;
};

const getMessages = async(idConversation)=>{
  const chats = await Conversation.findOne({
      id: idConversation
  })
  if(!chats) return []
  return chats.populate(['messages'])
}

module.exports = {
  sendMessage,
  getMessages
}