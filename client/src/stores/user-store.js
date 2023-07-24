import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      auth: false,
      user: {}
    },
  }),
  getters: {
    isAuthtenticated: (state)=>state.user.auth,
    getContacts: (state)=>state.user.user.contacts.map(x=>({
      ...x,
      fullname: `${x.firstname} ${x.lastname}`
    }))
  },
  actions: {
    async getUser(){
      const token = window.localStorage.getItem('user')
      try {
        const response = await axios.get('http://localhost:3001/user', {headers: {'x-access-token': JSON.parse(token).token}})
        console.log(response);
        this.user = {
          ...response.data
        }
      } catch (error) {
        console.log(error.response);
        window.localStorage.removeItem('user')
      }

    },
    async signup({firstname, lastname, username, password}){
        try {
            const response = await axios.post('http://localhost:3001/signup', {firstname, lastname, username, password})
            console.log(response);
            window.localStorage.setItem('user', JSON.stringify(response.data))

            // this.user = {
            //   auth: true,
            //   user: response.data.user
            // }
            await this.getUser()
        } catch (error) {
            // console.log(error.response);
            if(error.response.status == 404)throw new Error(error.response.data.message)
        }
    },
    async singin({username, password}){
      try {
        const response = await axios.post('http://localhost:3001/signin', {username, password})
        console.log(response);
        window.localStorage.setItem('user', JSON.stringify(response.data))

        // this.user = {
        //   auth: true,
        //   user: response.data.user
        // }
        await this.getUser()
    } catch (error) {
        // console.log(error.response);
        if(error.response.status == 404)throw new Error(error.response.data.message)
    }
    },
    logout(){
      window.localStorage.removeItem('user')
      this.user = {
        auth: false,
        user: {}
      }
    }
  },
});
