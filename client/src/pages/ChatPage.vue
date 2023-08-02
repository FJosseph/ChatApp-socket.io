<template>
  <q-card id="chat-container" class="">
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
              {{ `${user?.firstname} ${$q.screen.lt.sm ? "" : user.lastname}` }}
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
        <!-- <div class="row justify-between" style="width: 100%;">
              <div style="display: flex;flex-direction: row;align-items: center;" class="q-mx-md text-overline">CONVERSACIONES</div>
              <q-btn flat round color="primary" icon="add"/>
          </div> -->
        <div id="contacts-list">
          <q-scroll-area style="height: 100%">
            <!-- <contacts-list :list="contactList" /> -->
            <contacts-list :list="listDefinitive" />
          </q-scroll-area>
        </div>
      </q-card-actions>

      <q-slide-transition v-if="showProfile" duration="100" appear hidden>
        <profile-component :user="user" :qr-code="storeUser.user.token_qr" :toggle="() => (showProfile = false)" />
      </q-slide-transition>

      <q-separator vertical />
      <!-- <q-btn
        v-if="$q.screen.lt.sm && !expanded"
        color="grey"
        round
        flat
        dense
        :icon="'keyboard_arrow_right'"
        @click="expanded = !expanded"
      /> -->

      <q-card-section v-if="userCurrent" id="chats" class="q-pa-none" vertical>
        <!-- Head chat -->
        <div id="chat_header" class="row q-pa-sm">
          <!-- <div>{{ userCurrent }}</div> -->
          <q-toolbar class="">
            <q-avatar class="q-ml-none">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-toolbar-title>
              {{ `${userCurrent.fullname}` }}
            </q-toolbar-title>
            <q-btn flat round dense icon="more_vert" />
          </q-toolbar>
        </div>
        <!-- Body Chat -->
        <chat-component :messages="chats" />
        <!-- Footer Chat -->
        <div id="chat_footer" class="row q-pa-sm">
          <div class="q-mr-sm">
            <q-btn flat round color="black" icon="mood">
              <q-menu
          :offset="[0, 18]"
          transition-show="jump-down"
          transition-hide="jump-up"
          persistent
          style="background: transparent;border: none;box-shadow: none;height: 21rem;"
        >
        <emoji-picker v-on:emoji_click="(data)=>clickEmoji(data)"/>
      </q-menu>
            </q-btn>
          </div>
          <!-- <div id="footer_message"> -->
          <q-form @submit="handleSendMessage" id="footer_message">
            <div style="width: -webkit-fill-available" class="q-mr-sm">
              <input
                id="message"
                type="text"
                v-model="input.text"
                placeholder="Write your message"
              />
            </div>
            <q-btn flat round color="black" icon="mic" />
            <q-btn flat type="submit" round color="black" icon="send" />
          </q-form>
          <!-- </div> -->
          <!-- <q-input rounded standout on-focus="none" v-model="text" placeholder="Write your message" bg-color="blue-grey-1" color="blue-grey-12"/> -->
        </div>
      </q-card-section>
    </q-card-section>
    <q-dialog v-model="modalGroup">
      <form-create-group />
    </q-dialog>
    <!-- Add Contact -->
    <q-dialog v-model="modalAddFriend">
      <form-add-friend-vue/>
    </q-dialog>
    <q-dialog v-model="modalAddFriendLast">
      <add-friend-resume :add-contact="newContact"/>
    </q-dialog>
  </q-card>
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

const clickEmoji = (emoji)=>{
  // alert(emoji)
  input.value.text =  input.value.text.concat(emoji)
}

// Store
const storeChat = useChatStore();
const storeUser = useUserStore();

// Search conversation
const search = ref("");

// Profile state
const showProfile = ref(false);

// Modal
const modalGroup = ref(false);
const modalAddFriend = ref(false);
const modalAddFriendLast = ref(false)
const newContact = ref(null)
provide('new-contact', newContact)
provide('modal-friend', modalAddFriend)
provide('modal-friend-last', modalAddFriendLast)

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
          x.fullname.toLowerCase().includes(search.value)
        );
  }
  return result;
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

// Socket
const socket = io("http://localhost:3001");
provide("socket", socket);
onMounted(() => {
  socket.emit("setup", user.value);
  // socket.on('connected', (id)=>{
  //   console.log(id);
  // })
  socket.on("server: new-message", (message) => {
    console.log("message: ", message);
    if (
      userCurrent.value &&
      userCurrent.value._id === message.conversation_id
    ) {
      storeChat.chat.push(message);
    }
  });
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
    socket.emit("client:new-message", {
      data_message: data,
      users: { user: finalMessage.user, userCurrent: finalMessage.userCurrent },
    });
    storeChat.chat.push(data);
    input.value = {
      text: "",
      image: "",
      audio: "",
    };
  }
};

// User
// const user = ref(contactList[0])
const user = computed(() => storeUser.user.user);
// User conversation
const userCurrent = ref(null);
provide("user-current", userCurrent);

// Manejo de scroll
const refChat = ref(null);
provide("ref-chat", refChat);

watch(
  () => userCurrent.value,
  async () => {
    console.log("asdas");
    await storeChat.setChats(
      userCurrent.value.conversation_id || userCurrent.value._id
    );
    // const heightContainerChat = refChat.value.$el.clientHeight
    const heightContainerChat = refChat.value.scrollHeight;
    refChat.value.scrollTop = heightContainerChat;
    console.log(heightContainerChat);
  }
);

const chats = computed(() => storeChat.chat);
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

#chat_header {
  background: white;
  position: absolute;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 10px 10px;
}

#chat_footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: white;
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
