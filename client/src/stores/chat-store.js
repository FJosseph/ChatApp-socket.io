import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user-store";
import { computed } from "vue";

const URL = 'http://localhost:3001'

const storeUser = useUserStore()
const USER_ID = computed(()=>storeUser.data._id)

export const useChatStore = defineStore("chat", {
  state: () => ({
    chat: [],
    users: []
  }),
  getters: {
    getListUsers: (state)=>state.users
  },
  actions: {
    async sendMessage({ text, image, audio }) {
      try {

      } catch (error) {
        
      }
    },
    async setListUsers(){
      try {
        const response = await axios.get(`${URL}/chat/users`)
        this.users = response.data
        return
      } catch (error) {
        throw new Error(error)
      }
    },
    async setChats(idConversation){
      try {
          const response = await axios.get(`${URL}/chat/messages/${idConversation}`)
          console.log(response);
          return
      } catch (error) {
        console.log(error.message);
      }
    }
  },
});
