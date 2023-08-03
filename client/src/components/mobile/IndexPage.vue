<template>
  <div id="container_mobile_chat" class="q-pt-lg">
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
        <input class="q-ml-sm" type="text" placeholder="Search" />
      </div>
    </div>
    <div class="col-12" id="contacts-list_mobile">
      <q-scroll-area style="height: 100%; width: 100%">
        <contacts-list :list="listConversations" />
      </q-scroll-area>
    </div>
    <div class="row q-px-md q-pt-sm" style="width:100%;">
        <q-tabs
        active-color="black"
        indicator-color="transparent"
        v-model="tabMenu"
        id="tabs_mobile"
        class="shadow-2 text-blue-grey-12

"
      >
        <q-tab name="messages" icon="sms" />
        <q-tab name="groups" icon="groups" />
        <q-tab name="setting" icon="settings" />
      </q-tabs>
      <!-- {{ tabMenu }} -->
    </div>
  </div>
</template>
<script setup>
import ContactsList from "src/components/contacts/ConversationList.vue";
import { ref } from "vue";
const tabMenu = ref('messages')
defineProps({
  user: { type: Object },
  listConversations: { type: Array },
});
</script>
<style>
#container_mobile_chat {
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
#tabs_mobile{
    border-radius: 2em;
    background: rgb(134 148 165 / 6%);
    border: none;
    box-shadow: none;
    width: 100%;
}
</style>
