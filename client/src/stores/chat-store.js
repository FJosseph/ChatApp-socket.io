import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user-store";
import { computed } from "vue";

const URL = "http://localhost:3001";

const storeUser = useUserStore();
const USER_ID = computed(() => storeUser.user.user._id);

export const useChatStore = defineStore("chat", {
  state: () => ({
    chat: [],
    users: [],
  }),
  getters: {
    getListUsers: (state) => state.users,
    getConversations: () => storeUser.user.user.conversations_id,
    getConversationsFormatted: () =>
      storeUser.user.user.conversations_id.map((x) => {
        // const user =
        if (x.is_group) {
          console.log(x);
          return {
            _id: x._id,
            conversation_id: x._id,
            ...x,
            fullname: x.name_group,
          };
        }
        const { _id, firstname, lastname, username } = x.users_id.find(
          (x) => x._id !== USER_ID.value
        );
        return {
          user_id: _id,
          firstname,
          lastname,
          fullname: `${firstname} ${lastname}`,
          username,
          ...x,
          conversation_id: x._id,
        };
      }),
  },
  actions: {
    async sendMessage({ user, conversation_id, userCurrent, message }) {
      try {
        if (!conversation_id) {
          const response = await axios.post(`${URL}/chat/messages`, {
            members_id: [user, userCurrent],
            sender_id: user,
            message,
          });
          return response.data;
        }
        const response = await axios.post(
          `${URL}/chat/messages?id_conversation=${conversation_id}`,
          {
            sender_id: user,
            message,
          }
        );
        return response.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async setListUsers() {
      try {
        const response = await axios.get(`${URL}/chat/users`);
        this.users = response.data;
        return;
      } catch (error) {
        throw new Error(error);
      }
    },
    async createGroup(members_id, admin_id, name_group) {
      const members_refactor = members_id.map(x=>x._id)
      try {
        const response = await axios.post(`${URL}/chat/new-group`, {
          members_id: [admin_id,...members_refactor],
          user_admin: admin_id,
          name_group,
        });
        const newConversation = response.data.newGroup
        console.log(newConversation);
        // Añadiendo conversación
        storeUser.user.user.conversations_id.push(newConversation)
      } catch (error) {
        throw new Error(error.response.data.message)
      }
    },
    async setChats(idConversation) {
      try {
        const response = await axios.get(
          `${URL}/chat/messages/${idConversation}?id_user=${USER_ID.value}`
        );
        // console.log(response.data);
        this.chat = response.data.messages_user[0].messages_id;
        return;
      } catch (error) {
        console.log(error.response.data.message);
        this.chat = [];
      }
    },
  },
});
