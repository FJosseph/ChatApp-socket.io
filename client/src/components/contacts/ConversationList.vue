<template>
  <q-list>
    <q-item
      v-for="contact in list"
      :key="contact.id"
      class=""
      clickable
      v-ripple
      @click="
        (userCurrent = contact) &&
          socket.emit('join chat', contact.conversation_id || contact._id)
      "
    >
      <q-item-section avatar>
        <q-avatar>
          <img
            :src="
              contact.avatar ||
              'https://scontent.fpio1-1.fna.fbcdn.net/v/t1.6435-9/109684207_754153485355615_5752930372679852023_n.png?stp=dst-png_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=8024bb&_nc_ohc=hET2W7-m8hkAX8JGQ7d&_nc_ht=scontent.fpio1-1.fna&oh=00_AfA7t0cr-KoRca_8lmq76mYY3etM3S_VEquq4E4W7Ay0CQ&oe=64F29438'
            "
          />
          <!-- <q-badge floating rounded color="green"></q-badge> -->
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{ `${contact.fullname}` }}</q-item-label>
        <q-item-label caption>
          <template v-if="contact?.last_message?.sender_id == user._id">
            <q-icon :name="iconCheck[contact?.last_message?.is_check]" :color="iconColor[contact?.last_message?.is_check]"/>
          </template>
          <!-- <q-icon name="check" /> -->
          {{ contact?.last_message?.message.text }}
        </q-item-label>
        <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
      </q-item-section>
      <!-- <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section> -->
      <q-item-section side top>
        <!-- <q-icon name="chat_bubble" color="grey" /> -->
        <!-- <q-badge rounded color="green" /> -->
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { inject } from "vue";
const iconCheck = {
  true: 'done_all',
  false: 'check'
}

const iconColor = {
  true: 'blue',
  false: 'black'
}
// Socket.io
const socket = inject("socket");
defineProps({
  list: {
    type: Array,
  },
  user: {
    type: Object
  }
});
const userCurrent = inject("user-current");
</script>
<style></style>
