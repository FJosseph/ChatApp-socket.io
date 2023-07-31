<template>
  <q-card>
    <q-card-section class="q-pt-lg q-pb-none">
      <div class="text-h6">Selecciona a tus amigos</div>
      <div class="text-subtitle">
        Añade a tus amigos a una conversación grupal
      </div>
    </q-card-section>

    <q-card-section>
      <div class="container_input q-pa-sm">
        <q-chip
          square
          v-for="member in input.members"
          :key="member._id"
          removable
          v-model="modelFriends[member._id].selected"
          color="deep-purple-9"
          text-color="white"
        >
          {{ member.fullname }}
        </q-chip>
        <input
          class="input_textfield"
          type="text"
          v-model="input.search"
          placeholder="Busca a tus amigos"
          @keydown.delete="deleteLastChip"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <q-scroll-area
        v-if="contactsList.length"
        style="height: 200px; max-width: 300px"
      >
        <contact-list :list="contactsList" />
      </q-scroll-area>
      <div v-else>Agrega algunos contactos</div>
    </q-card-section>
    <q-card-section>
      <div class="row justify-center">
        <q-btn
          :disable="!input.members.length"
          color="deep-purple-9"
          style="width: 100%"
          @click="modal = !modal"
          >Siguiente</q-btn
        >
      </div>
    </q-card-section>
    <q-dialog v-model="modal">
      <modal-create-group :handle-submit="handleSubmit" />
    </q-dialog>
  </q-card>
</template>
<script setup>
import { computed, provide, ref, watch } from "vue";
import ContactList from "../contacts/ContactList.vue";
import { useUserStore } from "src/stores/user-store";
import { useChatStore } from "src/stores/chat-store";
import ModalCreateGroup from "./ModalCreateGroup.vue";

// Stores
const storeUser = useUserStore();
const storeChat = useChatStore();

// Modal
const modal = ref(false);

const allContacts = computed(() => storeUser.getContacts);
const contactsList = computed(() => {
  let result = allContacts.value;
  if (input.value.search) {
    result = result.filter(
      (x) =>
        x.fullname.toLowerCase().includes(input.value.search.toLowerCase()) ||
        x.username.includes(input.value.search)
    );
  }
  return result;
});

const input = ref({
  search: "",
  members: [],
});
provide("contacts-input", input);

const modelFriends = ref({});

provide("model-friends", modelFriends);

const deleteLastChip = () => {
  if (!input.value.search.length) {
    const lastMemberSelected = input.value.members.pop();
    console.log(lastMemberSelected);
    modelFriends.value[lastMemberSelected._id].selected =
      !modelFriends.value[lastMemberSelected._id].selected;
  }
};

const handleSubmit = async (name_group) => {
  console.log("Hola mundo!!");
  try {
    await storeChat.createGroup(
      input.value.members,
      storeUser.user.user._id,
      name_group
    );
    modal.value = !modal.value;
  } catch (error) {}
};
</script>
<style>
.container_input {
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  width: 100%;
  max-width: 21em;
  display: flex;
  flex-wrap: wrap;
}

.input_textfield {
  border: none;
  background: none;
  outline: none;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.87);
}
</style>
