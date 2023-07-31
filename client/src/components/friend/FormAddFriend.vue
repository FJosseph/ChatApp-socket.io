<template>
  <q-card>
    <q-card-section class="q-pt-lg q-pb-none">
      <div class="text-h6 text-center">¡Agrega a un amigo!</div>
      <div class="text-subtitle text-center">Usando su token</div>
    </q-card-section>
    <q-form @submit="handleSubmit">
      <q-card-section class="q-gutter-sm row justify-center">
        <q-input
          outlined
          v-model="input"
          dense
          placeholder="¡Copia el token aquí!"
        />
        <q-btn type="submit" color="deep-purple-9">Agregar</q-btn>
      </q-card-section>
    </q-form>
    <q-separator inset></q-separator>
    <q-card-section class="q-mb-md">
      <!-- <div class="text-center">Ó</div> -->
      <div class="text-subtitle text-center q-mb-md">Usando su código QR</div>
      <div class="row justify-center">
        <q-btn color="deep-purple-9" icon-right="camera" label="Escanea" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useChatStore } from "src/stores/chat-store";
import { inject, ref } from "vue";

//Store
const storeChat = useChatStore();
const newContact = inject("new-contact");
const modalAddFriend = inject("modal-friend");
const modalLast = inject("modal-friend-last");

const input = ref("");

const handleSubmit = async () => {
  try {
    const contact = await storeChat.addContact(input.value);
    newContact.value = contact;
    modalAddFriend.value = false;
    modalLast.value = true;
  } catch (error) {}
};
</script>
<style></style>
