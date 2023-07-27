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
        <q-input
          style="max-width: 300px"
          outlined
          v-model="input.search"
          autogrow
          dense
          placeholder="Busca a tus amigos"
        >
          <template v-slot>
            <div v-if="input.members.length">
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
            </div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-scroll-area style="height: 200px; max-width: 300px">
          <contact-list :list="contactsList" />
        </q-scroll-area>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-btn color="deep-purple-9" style="width: 100%" type="submit"
            >Crear grupo</q-btn
          >
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import { computed, provide, ref, watch } from "vue";
import ContactList from "../contacts/ContactList.vue";
import { useUserStore } from "src/stores/user-store";

const storeUser = useUserStore();
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

const handleSubmit = () => {
  console.log("Hola mundo!!");
};
</script>
<style></style>
