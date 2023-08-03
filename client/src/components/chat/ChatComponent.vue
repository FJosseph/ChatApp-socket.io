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
    <MessageComponent v-for="message in messages" :key="message.id" :user="user" :id="message._id" :is_group="isGroupData.is_group" :group="isGroupData.users" :user_current="conversationCurrent.user_id" :sender="message.sender_id" :message="message.message"/>
  <!-- </q-scroll-area> -->

    <!-- <div class="q-my-sm" v-for="(e, i) in messages" :key="i">{{ e.message.text }}</div> -->
  </div>
</template>
<script setup>
import { useChatStore } from "src/stores/chat-store";
import { computed, inject, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import MessageComponent from "./MessageComponent.vue";
import { useUserStore } from "src/stores/user-store";
// Store
const storeChat = useChatStore();
const storeUser = useUserStore()
const conversationCurrent = inject("user-current");

const user = computed(()=>storeUser.user.user._id)

const isGroupData = computed(()=>{
  let objGroup = {
    is_group: false,
    users: {}
  }
  if(conversationCurrent.value.is_group){
    objGroup.users = conversationCurrent.value.users_id.reduce((a,b)=>{
      a[b._id] = b.username
      return a
    },{})
    objGroup.is_group = true
  }
  return objGroup
})

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

@media (max-width: 400px) {
  #chats_container_last{
    background: white;
  }
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
