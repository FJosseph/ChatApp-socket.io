<template>
  <div
    :id="id"
    class="flex row q-my-md"
    :class="classPosition[sender === user]"
  >
    <div class="flex row justify-center message-container">
      <!-- <div class="message sender text-start" v-if="sender === user_current">
                {{ message.text }}
            </div>
            <div class="message received text-start" v-else>
                {{ message.text }}
            </div> -->
      <div class="message sender text-start" v-if="sender !== user">
        <div v-if="is_group" class="text-caption text-weight-bold">
          {{ group[sender] }}
        </div>
        {{ message.text }}
      </div>
      <div class="message received text-start" v-else>
        {{ message.text }}
      </div>
      <!-- <div :class="`message ${clasesMessage[sender !== user_current]} text-start`">
                {{ message.text }}
            </div> -->
    </div>
  </div>
</template>
<script setup>
const clasesMessage = {
  false: "sender",
  true: "received",
};

const classPosition = {
  false: "justify-start",
  true: "justify-end",
};
defineProps({
  id: { type: String },
  user: { type: String },
  user_current: { type: String },
  sender: { type: String },
  message: {
    type: Object,
  },
  is_group: {
    type: Boolean,
  },
  group: {
    type: Object,
  },
});
</script>
<style>
.message-container {
  max-width: 35.5em;
}

.message {
  padding: 0.4em 0.5em;
  border-radius: 0.4em;
}
.sender {
  background: #a38af5d8;
}
.received {
  background: #5aa4c1;
}
</style>
