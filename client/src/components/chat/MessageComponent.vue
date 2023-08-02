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
<style scoped>
.message-container {
  max-width: 35.5em;
}

.message {
  padding: 0.4em 0.5em;
  position: relative;
  z-index: 1;
}
.sender {
  border-radius: 4px 4px 4px 0px;
  background: #a38af5d8;
}
.received {
  background: #5aa4c1;
  border-radius: 4px 4px 0;

}

.received::before{
  content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    left: 100%;
    border-left: 0 solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #5aa4c1;
}

.sender::before{
  content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    right: 100%;
    border-right: 0 solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid #a38af5d8;
  }

</style>
