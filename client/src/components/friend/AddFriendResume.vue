<template>
  <q-card align="center" class="q-pa-md">
    <q-card-section class="q-py-none">
      <div class="text-h6 text-center">Felicidades</div>
      <div class="text-subtitle text-center"></div>
    </q-card-section>
    <q-card-section>
        <div class="image-container"
          :style="`background-image: url(${
            addContact.avatar ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          })`"
        ></div>
    </q-card-section>
    <div class="text-subtitle text-center">
      Agregaste a: <strong>
          {{ addContact.username }}
      </strong>
    </div>
    <div class="row justify-center q-my-sm">
        <q-btn @click="modalLast = false" color="deep-purple-9">Continuar</q-btn>
    </div>
  </q-card>
</template>
<script setup>
import { inject } from "vue";

const modalLast = inject("modal-friend-last");

defineProps({
  addContact: {
    type: Object,
  },
});
</script>
<style>
.image-container {
  width: 10em;
  height: 10em;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-box-shadow: 3px 3px 14.5px 1px #808080;
  -moz-box-shadow: 3px 3px 14.5px 1px #d6d6d6;
  box-shadow: 3px 3px 14.5px 1px #c4c4c4;
  border: 1px solid transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
