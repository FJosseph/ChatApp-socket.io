<template>
  <q-card>
    <q-card-section class="q-pt-lg q-pb-none">
      <div class="text-h6">Selecciona a tus amigos</div>
      <div class="text-subtitle">
        Añade a tus amigos a una conversación grupal
      </div>
    </q-card-section>
    <q-form @submit="handleSubmit">
      <q-card-section>
        <q-input outlined v-model="input.name" dense placeholder="Busca a tus amigos"/>
      </q-card-section>
      <q-card-section>
        <q-scroll-area style="height: 200px; max-width: 300px;">
        </q-scroll-area>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
            <q-btn type="submit">Click me!</q-btn>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import { ref } from "vue";

const input = ref({
  name: "",
  members: [],
});

const handleSubmit = ()=>{
    console.log('Hola mundo!!');
}
</script>
<style></style>
