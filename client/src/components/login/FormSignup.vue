<template>
  <q-card class="form">
    <div class="q-pa-md q-pb-lg">
      <div class="row justify-center text-center text-h3 q-my-lg">Sign Up</div>
      <q-form class="q-gutter-sm q-px-md" @submit="onSubmit">
        <div class="row q-mt-lg">
          <q-input
            class="col-6 q-pr-sm"
            color="deep-purple-7"
            outlined
            v-model="input.firstname"
            label="Firstname"
            lazy-rules
            :rules="[(val) => val.length || 'Ingresa un usuario']"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="person" color="deep-purple-7" />
              </q-avatar>
            </template>
          </q-input>
          <q-input
            class="col-6 q-pl-sm"
            color="deep-purple-7"
            outlined
            v-model="input.lastname"
            label="Lastname"
            lazy-rules
            :rules="[(val) => val.length || 'Ingresa un usuario']"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="person" color="deep-purple-7" />
              </q-avatar>
            </template>
          </q-input>
        </div>
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
        <q-input
          class="col-12"
          color="deep-purple-7"
          outlined
          v-model="passwordRepeat"
          :type="visibilityPRepeat ? 'text' : 'password'"
          label="Password"
          lazy-rules
          :rules="[validatePassword]"
        >
          <template v-slot:append>
            <q-avatar @click="visibilityPRepeat = !visibilityPRepeat">
              <q-icon
                :name="!visibilityPRepeat ? 'visibility' : 'visibility_off'"
                color="deep-purple-7"
              />
            </q-avatar>
          </template>
        </q-input>
        <div class="col q-my-none" :style="$q.screen.lt.sm && 'justify-content:center; display:flex'">
          ¿Tienes una cuenta?
          <a
            @click="changeForm = !changeForm"
            class=""
            style="cursor: pointer; font-weight: 500; color: #725ac1"
            >Ingresa</a
          >
        </div>
        <div class="row justify-center">
          <button id="submit" type="submit">Sign Up</button>
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
const visibilityPRepeat = ref(false);

const input = ref({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
});

const passwordRepeat = ref("");

const validatePassword = (val) =>
  (!val.length && "Ingresa una contraseña") ||
  (val != input.value.password && "Las contraseñas deben ser iguales") ||
  null;

const onSubmit = async() => {
  try {
    await userStore.signup(input.value);
    Notify.create({
      message: 'User has been created succesfull',
      color: 'green'
    })
    router.push('/chatapp')
  } catch (error) {
    console.log(error);
    Notify.create({
      message: String(error).split(':')[1],
      color: 'red'
    })
  }
};
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
