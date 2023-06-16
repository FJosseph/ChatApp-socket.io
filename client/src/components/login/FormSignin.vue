<template>
  <q-card class="form">
    <div class="q-pa-md q-pb-lg">
      <div class="row justify-center text-center text-h3 q-my-lg">Sign In</div>
      <q-form class="q-gutter-sm q-px-md" @submit="onSubmit">
        <q-input
          color="deep-purple-7"
          outlined
          v-model="input.username"
          label="Username"
          lazy-rules
          :rules="[(val) => val.length || 'Ingresa un usuario']"
        >
          <template v-slot:append>
            <q-avatar>
              <q-icon name="mail" color="deep-purple-7" />
            </q-avatar>
          </template>
        </q-input>
        <q-input
          color="deep-purple-7"
          outlined
          v-model="input.password"
          :type="visibility ? 'text' : 'password'"
          label="Password"
          lazy-rules
          :rules="[(val) => val.length || 'Ingresa un usuario']"
        >
          <template v-slot:append>
            <q-avatar @click="visibility = !visibility">
              <q-icon
                :name="!visibility ? 'visibility' : 'visibility_off'"
                color="deep-purple-7"
              />
            </q-avatar>
          </template>
        </q-input>
        <div class="col q-my-none" :style="$q.screen.lt.sm && 'justify-content:center; display:flex'">
          ¿Aún no tienes una cuenta?
          <a
            @click="changeForm = !changeForm"
            class=""
            style="cursor: pointer; font-weight: 500; color: #725ac1"
            >Regístrate</a
          >
        </div>
        <div class="row justify-center">
          <button id="submit" type="submit">Sign In</button>
        </div>
      </q-form>
    </div>
  </q-card>
</template>
<script setup>
import { inject, provide, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import {Notify} from 'quasar'
import { useRouter } from "vue-router";

// Router
const router = useRouter()

// Store
const userStore = useUserStore();

const changeForm = inject("changeForm");

const visibility = ref(false);

const input = ref({
  username: "",
  password: "",
});

const onSubmit = async()=>{
  try {
    await userStore.singin(input.value)
     Notify.create({
      message: 'User signin',
      color: 'green'
    })
    router.push('/chatapp')
  } catch (error) {
     Notify.create({
      message: String(error).split(':')[1],
      color: 'red'
    })
  }
}
</script>
<style>
#submit {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 12px 20px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #725ac1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #725ac1;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #725ac1;
}

#submit:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #725ac1;
}

#submit:active {
  transform: scale(0.9);
}
</style>
