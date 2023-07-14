<template>
  <div
    id="chats_container_last"
    class="q-pa-sm"
    style="
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      padding-top: 5em;
      padding-bottom: 4em;
    "
  >
    <div class="q-my-sm" v-for="(e, i) in messages" :key="i">{{ e }}</div>
  </div>
</template>
<script setup>
import { useChatStore } from "src/stores/chat-store";
import { inject, watchEffect } from "vue";
// Store
const storeChat = useChatStore();

const conversationCurrent = inject("user-current");


watchEffect(() => {
  storeChat.setChats(
    conversationCurrent.value.conversation_id || conversationCurrent.value._id
  );
});

defineProps({
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
</style>
