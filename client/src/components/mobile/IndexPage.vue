<template>
  <div id="container_mobile">
    <div v-if="!userCurrent" id="container_mobile_chat" class="q-pt-lg">
      <!-- Messages View -->
      <div v-if="tabMenu == 'messages'" id="container_home">
        <div class="q-px-md" id="container_header">
          <q-toolbar class="q-pb-md q-pl-xs">
            <q-toolbar-title> Messages </q-toolbar-title>
            <q-avatar @click="showProfile = true" style="cursor: pointer">
              <img
                :src="
                  user.avatar ||
                  'https://cdn-icons-png.flaticon.com/512/9309/9309495.png'
                "
              />
            </q-avatar>
          </q-toolbar>
          <div class="row q-mb-md" id="search_input">
            <q-icon name="search" class="q-ml-sm" size="1.2em"></q-icon>
            <input
              class="q-ml-sm"
              v-model="search"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="col-12" id="contacts-list_mobile">
          <q-scroll-area style="height: 100%; width: 100%">
            <contacts-list :list="listConversations" />
          </q-scroll-area>
        </div>
      </div>
      <!-- Group View -->

      <q-slide-transition v-if="tabMenu == 'groups'" duration="100" appear>
        <group-component />
      </q-slide-transition>
      <q-slide-transition v-if="tabMenu == 'setting'" duration="100" appear>
        <div class="q-pb-xl" style="overflow: auto">
          <profile-component
            :user="user"
            :qr-code="qrCode"
            :toggle="() => (tabMenu = 'messages')"
          />
        </div>
      </q-slide-transition>
      <!-- Footer -->
      <div id="footer_mobile" class="row q-px-md q-pt-sm" style="width: 100%">
        <q-tabs
          active-color="black"
          indicator-color="transparent"
          v-model="tabMenu"
          id="tabs_mobile"
          class="shadow-2 text-blue-grey-12"
        >
          <q-tab name="messages" icon="sms" />
          <q-tab name="groups" icon="groups" />
          <q-tab name="setting" icon="settings" />
        </q-tabs>
        <!-- Button actions -->
        <div v-if="tabMenu !== 'setting'" class="row btn-actions">
          <q-btn
            style="position: absolute"
            round
            icon="add"
            color="deep-purple-7
        "
          ></q-btn>
        </div>
      </div>
    </div>
    <q-slide-transition v-else>
      <div id="chat_mobile">
        <toolbar-chat :user-current="userCurrent" />
        <chat-component :messages="chats" />
        <footer-component />
      </div>
    </q-slide-transition>
  </div>
</template>
<script setup>
import ProfileComponent from "src/components/profile/ProfileComponent.vue";
import ContactsList from "src/components/contacts/ConversationList.vue";
import { inject, ref } from "vue";
import GroupComponent from "./GroupComponent.vue";
import ChatComponent from "src/components/chat/ChatComponent.vue";
import ToolbarChat from "src/components/mobile/ToolbarChat.vue";
import FooterComponent from "../footer/FooterComponent.vue";
const tabMenu = ref("messages");
const search = inject("search");
const chats = inject("chat-data");
const userCurrent = inject("user-current");
defineProps({
  user: { type: Object },
  listConversations: { type: Array },
  qrCode: { type: String },
  toggle: { type: Function },
});
</script>
<style>
#container_mobile {
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
}

#container_mobile_chat,
#container_home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
}

#container_header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100%; */
}

input {
  border: none;
  background: none;
}

input:focus {
  border: none;
  outline: none;
}

#search_input {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 2em;
  width: 100%;
  height: 3.2em;
  /* background: #e2e2e2; */
  /* background: rgba(149, 198, 255, 0.05); */
  /* background: #ecf3f6; */
  background: rgb(134 148 165 / 6%);
  padding: 0.6em;
}

#contacts-list_mobile {
  width: 100%;
  height: calc(100% - 186px);
}

#footer_mobile {
  background: transparent;
  position: absolute;
  bottom: 10px;
}

#tabs_mobile {
  border-radius: 2em;
  /* background: rgb(134 148 165 / 6%); */
  /* background: rgb(246 250 255); */
  background: rgb(248 251 255);
  border: none;
  box-shadow: none;
  width: 100%;
}

.btn-actions {
  display: flex;
  position: relative;
  z-index: 10;
  right: 3em;
  bottom: 4em;
}

#chat_mobile {
  height: 100%;
  width: 100%;
}
</style>
