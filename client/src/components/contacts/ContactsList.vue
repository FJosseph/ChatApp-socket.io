<template>
  <q-list separator>
    <q-item
      v-for="contact in list"
      :key="contact.id"
      class=""
      clickable
      v-ripple
      @click="(userCurrent = contact) && socket.emit('join chat', contact.conversation_id || contact._id)"
    >
      <q-item-section avatar>
        <q-avatar>
          <img :src="contact.avatar || 'https://cdn4.iconfinder.com/data/icons/buno-users/32/user_account_profile-512.png'" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ `${contact.firstname} ${contact.lastname}` }}</q-item-label>
        <!-- <q-item-label>{{ contact.lastname }}</q-item-label> -->
        <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
      </q-item-section>

      <q-item-section side>
        <!-- <q-icon name="chat_bubble" color="grey" /> -->
        <q-badge rounded color="green" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { inject } from "vue";
const socket = inject('socket')
defineProps({
  list: {
    type: Array,
  },
});
const userCurrent = inject('user-current')
</script>
<style></style>
