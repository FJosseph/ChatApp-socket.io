<template>
    <div id="chat_footer" class="row q-pa-sm">
            <div class="q-mr-sm">
              <q-btn flat round color="black" icon="mood">
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
              <div style="width: -webkit-fill-available" class="q-mr-sm">
                <input
                  id="message"
                  type="text"
                  v-model="input.text"
                  placeholder="Write your message"
                />
              </div>
              <q-btn flat round color="black" icon="mic" />
              <q-btn flat type="submit" round color="black" icon="send" />
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
// defineProps({
//     handleSendMessage: {type: Function},
//     clickEmoji: {type: Function},
// })
</script>
<style>
    
</style>