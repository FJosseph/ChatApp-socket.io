<template>
  <div
    id="chats_container_last"
    class="q-pa-sm"
    ref="refChat"
    style="
      height: 100%;
      width: 100%;
      padding-top: 5em;
      padding-bottom: 4em;
      overflow: auto;
    "
  >
  <!-- <q-scroll-area ref="refChat" style="height: 100%;padding: 0px 1em;"> -->
    <MessageComponent v-for="message in messages" :key="message.id" :id="message._id" :user_current="conversationCurrent.user_id" :sender="message.sender_id" :message="message.message"/>
  <!-- </q-scroll-area> -->

    <!-- <div class="q-my-sm" v-for="(e, i) in messages" :key="i">{{ e.message.text }}</div> -->
  </div>
</template>
<script setup>
import { useChatStore } from "src/stores/chat-store";
import { inject, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import MessageComponent from "./MessageComponent.vue";
// Store
const storeChat = useChatStore();

const conversationCurrent = inject("user-current");

const refChat = inject('ref-chat')

const allProps = defineProps({
  messages: {
    type: Array,
  },
});
</script>
<style scoped>
#chats_container_last {
  /* background: url('https://brunty.me/files/chat-bgs/1.0/blue-pink-20-pct.png'); */
  background-color: #e6e7e7;
  background-size: contain;
}

#chats_container_last::-webkit-scrollbar {
    -webkit-appearance: none;
}

#chats_container_last::-webkit-scrollbar:vertical {
    width:10px;
}

#chats_container_last::-webkit-scrollbar-button:increment,#chats_container_last::-webkit-scrollbar-button {
    display: none;
} 

#chats_container_last::-webkit-scrollbar:horizontal {
    height: 10px;
}

#chats_container_last::-webkit-scrollbar-thumb {
    background-color: #8181817d;
    border-radius: 20px;
    /* border: 2px solid #e6e7e7; */
}

#chats_container_last::-webkit-scrollbar-track {
    border-radius: 10px;  
}
</style>
