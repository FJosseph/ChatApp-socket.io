<template>
  <q-card id="chat-container" flat>
    <q-card-section style="height: 100%" horizontal>
      <q-slide-transition>
        <q-card-actions
          v-show="expanded"
          class="q-pa-sm"
          id="contacts"
          vertical
          align="center"
        >
          <!-- Head contact -->
          <q-toolbar>
            <q-avatar>
              <img
                :src="
                  user.avatar ||
                  'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg'
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
              placeholder="Search or start a new conversation"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <!-- Contact List -->
          <div
            id="contacts-list"
            :style="$q.screen.lt.sm ? 'height: 40em' : 'height: 44em'"
          >
            <q-scroll-area style="height: 100%">
              <!-- <contacts-list :list="contactList" /> -->
              <contacts-list :list="listContact" />
            </q-scroll-area>
          </div>
        </q-card-actions>
      </q-slide-transition>

      <q-separator vertical />
      <q-btn
        v-if="$q.screen.lt.sm && !expanded"
        color="grey"
        round
        flat
        dense
        :icon="'keyboard_arrow_right'"
        @click="expanded = !expanded"
      />

      <q-card-section v-if="userCurrent" id="chats" class="q-pa-none" vertical>
        <!-- Head chat -->
        <div id="chat_header" class="row q-pa-sm">
          <!-- <div>{{ userCurrent }}</div> -->
          <q-toolbar class="">
            <q-avatar class="q-ml-none">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-toolbar-title>
              {{ `${userCurrent.firstname} ${userCurrent.lastname}` }}
            </q-toolbar-title>
            <q-btn flat round dense icon="more_vert" />
          </q-toolbar>
        </div>
        <!-- Body Chat -->
        <chat-component :messages="[]" />
        <!-- Footer Chat -->
        <div id="chat_footer" class="row q-pa-sm">
          <div class="q-mr-sm">
            <q-btn flat round color="black" icon="mood" />
          </div>
          <div id="footer_message">
            <q-form
              class="q-mr-sm"
              style="width: -webkit-fill-available"
              @submit="handleSendMessage"
            >
              <input
                id="message"
                type="text"
                v-model="input.text"
                placeholder="Write your message"
              />
            </q-form>
            <q-btn flat round color="black" icon="mic" />
            <q-btn flat round color="black" icon="send" />
          </div>
          <!-- <q-input rounded standout on-focus="none" v-model="text" placeholder="Write your message" bg-color="blue-grey-1" color="blue-grey-12"/> -->
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import ContactsList from "src/components/contacts/ContactsList.vue";
import ListOptionsProfile from "src/components/contacts/ListOptionsProfile.vue";
import { computed, provide, ref, watchEffect } from "vue";
import ChatComponent from "../components/chat/ChatComponent.vue";
import io from "socket.io-client";
import { useChatStore } from "src/stores/chat-store";
import { useUserStore } from "src/stores/user-store";

// Store
const storeChat = useChatStore();
const storeUser = useUserStore();

const optionsProfile = [{ label: "New", link: "/login" }];

const listContact = computed(() => storeChat.getListUsers);

const expanded = ref(true);

watchEffect(() => {
  storeChat.setListUsers();
});

const input = ref({
  text: "",
  image: "",
  audio: "",
});

// Socket
const socket = io("http://localhost:3001");

const handleSendMessage = () => {
  console.log(user.value);
  socket.emit("client:new-message", {
    user: user.value._id,
    userCurrent: userCurrent.value._id,
    message: input.value,
  });
};

// User
// const user = ref(contactList[0])
const user = computed(() => storeUser.user.user);
// User conversation
const userCurrent = ref(null);
provide("user-current", userCurrent);
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
  /* height: 100%; */
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
