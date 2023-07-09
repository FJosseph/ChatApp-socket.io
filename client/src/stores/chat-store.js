import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user-store";
import { computed } from "vue";

const URL = 'http://localhost:3001'

const storeUser = useUserStore()
const USER_ID = computed(()=>storeUser.user.user._id)

export const useChatStore = defineStore("chat", {
  state: () => ({
    chat: [],
    users: []
  }),
  getters: {
    getListUsers: (state)=>state.users,
    getConversations: ()=>storeUser.user.user.conversations_id,
    getConversationsFormatted: ()=>storeUser.user.user.conversations_id.map(x=>{
      // const user = 
      if(x.is_group){
        return
      }
      const {_id, firstname, lastname, username} = x.users_id.find(x=>x._id !== USER_ID.value)
      return {
        user_id: _id,
        firstname, lastname, username,
        ...x,
        conversation_id: x._id
      }
    })
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
