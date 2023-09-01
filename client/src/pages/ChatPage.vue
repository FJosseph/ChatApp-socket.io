<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <q-card id="chat-container" v-if="!$q.screen.lt.sm">
      <q-card-section style="height: 100%" horizontal>
        <q-card-actions
          v-if="!showProfile"
          v-show="expanded"
          class="q-pa-sm"
          id="contacts"
          vertical
          align="center"
        >
          <!-- Head contact -->
          <q-toolbar class="q-pt-md">
            <!-- <q-icon v-if="showProfile" name="arrow_back" @click="showProfile = false"></q-icon> -->
            <q-avatar @click="showProfile = true" style="cursor: pointer">
              <img
                :src="
                  user.avatar ||
                  'https://cdn-icons-png.flaticon.com/512/9309/9309495.png'
                "
              />
            </q-avatar>

            <q-toolbar-title>
              <div>
                {{
                  `${user?.firstname} ${$q.screen.lt.sm ? "" : user.lastname}`
                }}
              </div>
              <div style="font-size: 0.6em">{{ user.email }}</div>
            </q-toolbar-title>
            <q-btn flat round dense icon="more_vert">
              <list-options-profile :option-banner="optionsProfile" />
            </q-btn>
          </q-toolbar>
          <div class="q-my-sm q-pa-sm" id="search">
            <q-input
              rounded
              outlined
              dense
              v-model="search"
              placeholder="Busca o inicia una conversación"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <!-- Contact List -->
          <div id="contacts-list">
            <q-scroll-area style="height: 100%">
              <!-- <contacts-list :list="contactList" /> -->
              <contacts-list v-if="listDefinitive.length" :list="listDefinitive" :user="user"/>
              <div class="text-center" v-else>Aún no tienes conversaciones</div>
            </q-scroll-area>
          </div>
        </q-card-actions>

        <q-slide-transition v-if="showProfile" duration="100" appear hidden>
          <q-card-actions class="q-pa-sm" id="container-profile" align="center">
            <profile-component
              :user="user"
              :qr-code="storeUser.user.token_qr"
              :toggle="() => (showProfile = false)"
            />
          </q-card-actions>
        </q-slide-transition>

        <q-separator vertical />
        <q-card-section
          v-if="userCurrent"
          id="chats"
          class="q-pa-none"
          vertical
        >
          <!-- Head chat -->
          <div id="chat_header" class="row q-pa-sm">
            <toolbar-chat :user-current="userCurrent"/>
          </div>
          <!-- Body Chat -->
          <chat-component :messages="chats" />
          <!-- Footer Chat -->
          <footer-component :handle-send-message="handleSendMessage" :click-emoji="clickEmoji"/>
        </q-card-section>
      </q-card-section>
    </q-card>
    <mobile-chat
      :list-conversations="listDefinitive"
      :user="user"
      :qr-code="storeUser.user.token_qr"
      :toggle="() => (showProfile = false)"
      v-else
    />
    <q-dialog v-model="modalGroup">
      <form-create-group />
    </q-dialog>
    <!-- Add Contact -->
    <q-dialog v-model="modalAddFriend">
      <form-add-friend-vue />
    </q-dialog>
    <q-dialog v-model="modalAddFriendLast">
      <add-friend-resume :add-contact="newContact" />
    </q-dialog>
  </div>
</template>
<script setup>
import ContactsList from "src/components/contacts/ConversationList.vue";
import ProfileComponent from "src/components/profile/ProfileComponent.vue";
import ListOptionsProfile from "src/components/contacts/ListOptionsProfile.vue";
import FormCreateGroup from "src/components/group/FormCreateGroup.vue";
import { computed, onMounted, provide, ref, watch, watchEffect } from "vue";
import ChatComponent from "../components/chat/ChatComponent.vue";
import io from "socket.io-client";
import { useChatStore } from "src/stores/chat-store";
import { useUserStore } from "src/stores/user-store";
import FormAddFriendVue from "../components/friend/FormAddFriend.vue";
import AddFriendResume from "src/components/friend/AddFriendResume.vue";
import emojiPicker from "../components/emoji_picker/emojiPicker.vue";
import MobileChat from "../components/mobile/IndexPage.vue";
import FooterComponent from 'src/components/footer/FooterComponent.vue'
import ToolbarChat from 'src/components/toolbar/ToolbarChat.vue'
const clickEmoji = (emoji) => {
  // alert(emoji)
  input.value.text = input.value.text.concat(emoji);
};
provide('select-emoji', clickEmoji)

// Store
const storeChat = useChatStore();
const storeUser = useUserStore();

// Search conversation
const search = ref("");
provide("search", search);

// Profile state
const showProfile = ref(false);

// Modal
const modalGroup = ref(false);
const modalAddFriend = ref(false);
const modalAddFriendLast = ref(false);
const newContact = ref(null);
provide("new-contact", newContact);
provide("modal-friend", modalAddFriend);
provide("modal-friend-last", modalAddFriendLast);
provide('modal-group', modalGroup)

const optionsProfile = [
  {
    label: "Agregar amigo",
    link: "/login",
    icon: "add",
    handleFunction: () => {
      modalAddFriend.value = !modalAddFriend.value;
    },
  },
  {
    label: "Nuevo grupo",
    link: "/login",
    handleFunction: () => {
      modalGroup.value = !modalGroup.value;
    },
  },
];

const listContacts = computed(
  () =>
    // storeChat.getListUsers.filter((x) => x._id != user.value._id)
    storeUser.getContacts
);

// const listConversations = computed(() => storeChat.getConversations);
const listConversationsFormatted = computed(
  () => storeChat.getConversationsFormatted
);

const listDefinitive = computed(() => {
  let result = listConversationsFormatted.value;
  if (search.value) {
    const firstResult = result.filter((x) =>
      x.fullname.toLowerCase().includes(search.value.toLowerCase())
    );
    result = firstResult.length
      ? firstResult
      : listContacts.value.filter((x) =>
          x.fullname.toLowerCase().includes(search.value.toLowerCase())
        );
  }
  return result.sort((a,b)=>{
    if(a.last_date < b.last_date) return 1
    if(a.last_date > b.last_date) return -1
    return 0
  });
});

const expanded = ref(true);

watchEffect(() => {
  storeChat.setListUsers();
});

// Estados
const input = ref({
  text: "",
  image: "",
  audio: "",
});
provide("inputChat", input);

// User
// const user = ref(contactList[0])
const user = computed(() => storeUser.user.user);
// User conversation
const userCurrent = ref(null);
provide("user-current", userCurrent);

// Socket
const socket = io(import.meta.env.VITE_APP_URL_DOMAIN || process.env.URL_DOMAIN);
provide("socket", socket);
onMounted(() => {
  socket.emit("setup", user.value);
  // socket.on('connected', (id)=>{
  //   console.log(id);
  // })
  socket.on("server: new-message", (message) => {
    // console.log("message: ", message);
    const idConversation  = storeUser.user.user.conversations_id.findIndex(x=>message.conversation_id == x._id)
    // console.log(idConversation);
    if(idConversation  >= 0){
      storeUser.user.user.conversations_id[idConversation].last_date = message.date
      storeUser.user.user.conversations_id[idConversation].last_message = message
    } else {
      // storeUser.user.user.conversations_id.push(message)
      const newConversation = {...message.conversation_data, users_id: message.users_id}
      storeUser.user.user.conversations_id.push(newConversation)
    }

    if (
      userCurrent.value &&
      userCurrent.value._id === message.conversation_id
    ) {
      storeChat.chat.push(message);
    }
  });

  // Cambiar status del mensaje: is_check
  socket.on('server:message_checked', id_conversation => {
    const indexConversation = storeUser.user.user.conversations_id.findIndex(x=>x._id == id_conversation)
    // console.log(indexConversation);
    if(storeUser.user.user.conversations_id[indexConversation].last_message.sender_id == user.value._id){
    storeUser.user.user.conversations_id[indexConversation].last_message.is_check = true
    }
    // console.log(indexConversation);
  })
});

const handleSendMessage = async () => {
  if (input.value.text) {
    console.log(user.value);
    const finalMessage = {
      user: user.value._id,
      // userCurrent: userCurrent.value._id,
      conversation_id: userCurrent.value.conversation_id || null,
      userCurrent: userCurrent.value.user_id || userCurrent.value._id,
      message: input.value,
    };
    const data = await storeChat.sendMessage(finalMessage);
    console.log(data);
    // Desestructuración para usar los datos del usuarioo
    const {_id, username, firstname, lastname } = user.value
    socket.emit("client:new-message", {
      // Adición del usuario a los users_id, para poder acceder a él en la recepción
      data_message: {...data, users_id: [{_id, username, firstname,lastname},...data.conversation_data.users_id]},
      users: { user: finalMessage.user, userCurrent: finalMessage.userCurrent },
    });
    storeChat.chat.push(data);  
    // Adición del usuario actual para renderizarlo correctamente
    if(typeof data.conversation_data.users_id[0] == 'string'){
      data.conversation_data.users_id.unshift(userCurrent.value)
    }
    // Agrega como último mensaje
    const idConversation  = storeUser.user.user.conversations_id.findIndex(x=>data.conversation_id == x._id)
    // console.log(idConversation);

    if(idConversation >= 0){
      storeUser.user.user.conversations_id[idConversation].last_date = data.date
      storeUser.user.user.conversations_id[idConversation].last_message = data
    } else {
      // Adición de la data en caso no exista la conversación
      storeUser.user.user.conversations_id.push(data.conversation_data)
    }

    input.value = {
      text: "",
      image: "",
      audio: "",
    };
  }
};
provide('handle-send-message', handleSendMessage)


// Manejo de scroll
const refChat = ref(null);
provide("ref-chat", refChat);

watch(
  () => userCurrent.value,
  async () => {
    console.log("asdas");
    if(userCurrent.value){
      await storeChat.setChats(
        userCurrent.value.conversation_id || userCurrent.value._id
      );
      // const heightContainerChat = refChat.value.$el.clientHeight
      const heightContainerChat = refChat.value.scrollHeight;
      refChat.value.scrollTop = heightContainerChat;
      // Cambiar status del mensaje: is_check
      if(userCurrent.value.hasOwnProperty('conversation_id') && storeChat.chat.length){
        socket.emit('client:message_checked', {users_id: userCurrent.value.user_id || userCurrent.value._id, message_by_conversation:userCurrent.value})
        const indexConversation = storeUser.user.user.conversations_id.findIndex(x=>x._id == userCurrent.value.conversation_id)
        // Validación para el cambio de status del último mensaje
        // Última modificación
        if(storeUser.user.user.conversations_id[indexConversation].last_message.sender_id !== user.value._id){
          // Modificiación del status en caso sea el usuario diferente
          storeUser.user.user.conversations_id[indexConversation].last_message.is_check = true
        }
      }
    }
  }
);


const chats = computed(() => storeChat.chat);
provide('chat-data', chats)
watch(()=>chats.value.length, ()=>{
  const heightContainerChat = refChat.value.scrollHeight;
  setTimeout(()=>{
    refChat.value.scrollTop += heightContainerChat;
  }, 200)

  if(userCurrent.value && chats.value.length){
    const indexConversation = storeUser.user.user.conversations_id.findIndex(x=>x._id == userCurrent.value._id)
    // console.log(indexConversation);
    if(storeUser.user.user.conversations_id[indexConversation]?.last_message?.sender_id !== user.value._id){
        // Modificiación del status en caso sea el usuario diferente
        storeUser.user.user.conversations_id[indexConversation].last_message.is_check = true
    }
    socket.emit('client:message_checked', {users_id: userCurrent.value.user_id || userCurrent.value._id, message_by_conversation:userCurrent.value})
  }
  // if(userCurrent.value){
  //    // Cambiar status del mensaje: is_check
  //   //  userCurrent.value.last_message.is_check = true
  //   const indexConversation = storeUser.user.user.conversations_id.findIndex(x=>x._id == userCurrent.value._id)
  //   storeUser.user.user.conversations_id[indexConversation].last_message.is_check = true
  //   socket.emit('client:message_checked', {users_id: userCurrent.value.user_id || userCurrent.value._id, message_by_conversation:userCurrent.value})
  // }
})
</script>
<style>
#chat-container {
  width: 90%;
  height: 90%;
  max-width: 90em;
  max-height: 90em;
  /* overflow: hidden; */
}

#head-contacts {
  display: flex;
}

#search {
  width: 100%;
}

#contacts-list {
  width: 100%;
  height: calc(100% - 176px);
}

#contacts {
  width: 25%;
  /* width: 30em; */
  min-width: 20em;
}

#container-profile {
  width: 25%;
  /* width: 30em; */
  min-width: 20em;
  max-width: 25%;
  overflow-y: auto;
  height: 100%;
}

#chat_header {
  background: white;
  position: absolute;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 10px 10px;
  z-index: 10;
}

#chat_footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: white;
  z-index: 10;
}

#chats {
  height: 100%;
  width: 75%;
  overflow: hidden;
}
#message {
  width: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3em;
  padding: 10px;
}

#footer_message {
  display: flex;
  flex: 1%;
}
</style>
