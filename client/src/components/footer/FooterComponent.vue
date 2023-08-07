<template>
  <div id="chat_footer" class="row q-px-xs q-py-sm">
          <div class="q-mr-sm">
            <q-btn v-if="!$q.screen.lt.sm" flat round color="black" icon="mood">
              <q-menu
                :offset="[0, 18]"
                transition-show="jump-down"
                transition-hide="jump-up"
                persistent
                style="
                  background: transparent;
                  border: none;
                  box-shadow: none;
                  height: 21rem;
                "
              >
                <emoji-picker v-on:emoji_click="(data) => clickEmoji(data)" />
              </q-menu>
            </q-btn>
          </div>
          <!-- <div id="footer_message"> -->
          <q-form @submit="handleSendMessage" id="footer_message">
            <div style="width: -webkit-fill-available">
              <input
                id="message"
                type="text"
                v-model="input.text"
                placeholder="Escribe tu mensaje"
              />
            </div>
            <q-btn class="q-ml-xs" v-if="$q.screen.lt.sm"  round :type="input.text && 'submit'" color="deep-purple-7" :icon="iconFooter[!!input.text]" />
            <q-btn v-if="!$q.screen.lt.sm" flat round color="black" icon="mic" />
            <q-btn v-if="!$q.screen.lt.sm" flat type="submit" round color="black" icon="send" />
          </q-form>
          <!-- </div> -->
          <!-- <q-input rounded standout on-focus="none" v-model="text" placeholder="Write your message" bg-color="blue-grey-1" color="blue-grey-12"/> -->
        </div>
</template>
<script setup>
import { inject } from "vue"
import emojiPicker from "../emoji_picker/emojiPicker.vue"

const input = inject('inputChat')

const handleSendMessage = inject('handle-send-message')
const clickEmoji = inject('select-emoji')
const iconFooter = {
true: 'send',
false: 'mic'
}
// defineProps({
//     handleSendMessage: {type: Function},
//     clickEmoji: {type: Function},
// })
</script>
<style>
  
</style>