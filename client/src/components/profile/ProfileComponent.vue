<template>
  <q-card-actions class="q-pa-sm" id="container-profile" align="center">
    <q-toolbar class="q-pt-md">
      <q-icon
        style="cursor: pointer"
        class="q-mr-md"
        name="arrow_back"
        @click="toggle"
      ></q-icon>
      <q-toolbar-title> Mi perfil </q-toolbar-title>
    </q-toolbar>
    <div class="q-my-sm q-pa-sm row" id="avatar-profile">
      <div
        class="image-container"
        :style="`background-image: url(${
          user.avatar ||
          'https://cdn-icons-png.flaticon.com/512/9309/9309495.png'
        });background-color: #57575781;background-blend-mode: ${
          changeAvatar ? 'darken' : ''
        }
     `"
        @mouseover="changeAvatar = !changeAvatar"
        @mouseleave="changeAvatar = !changeAvatar"
      >
        <div v-show="changeAvatar">
          <label class="text-white">Edita la imagen</label>
        </div>
        <q-menu
          :offset="[-60, -28]"
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>Ver Foto</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Tomar Foto</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Cargar Foto</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Eliminar Foto</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
    <div class="row flex q-mt-xl container-labels">
      <div class="col-6 q-px-md">
        <label class="row flex justify-between" for="firstname">
          <div class="text-center text-labels">
            <strong> Nombres </strong>
          </div>
          <q-btn
            flat
            round
            icon="edit"
            @click="handleChangeData('firstname')"
          />
        </label>
        <p v-if="!inputChange.firstname">{{ input.firstname }}</p>
        <q-input v-else v-model="input.firstname" dense autofocus />
      </div>
      <div class="col-6 q-px-md">
        <label class="row flex justify-between" for="lastname">
          <div class="text-center text-labels">
            <strong> Apellidos </strong>
          </div>
          <q-btn flat round icon="edit" @click="handleChangeData('lastname')" />
        </label>
        <p v-if="!inputChange.lastname">{{ input.lastname }}</p>
        <q-input v-else v-model="input.lastname" dense autofocus />
      </div>
    </div>
    <div class="row q-mb-sm justify-center container-labels">
      <div class="col-12 q-px-sm text-center">
        <label
          class="row flex justify-center"
          style="align-items: center"
          for="description"
        >
          <div class="text-labels"><strong> Descripción </strong></div>
          <q-btn
            flat
            round
            class="q-ml-md"
            icon="edit"
            @click="handleChangeData('description')"
          />
        </label>
        <p v-if="!inputChange.description">
          {{ input.description || "Agrega una descripción" }}
        </p>
        <q-input v-else v-model="input.description" dense autofocus />
      </div>
    </div>
    <div class="col-12 data_shared justify-center aling-center">
      <div class="row text-labels">
        <strong>¡Comparte tu token!</strong>
      </div>
      <div class="row q-my-md">
        <q-field outlined dense maxlength="12">
          <template v-slot:append>
            <q-icon @click="handleCopy(qrCode)" name="content_copy"></q-icon>
          </template>
          <template v-slot:control>
            <div style="width: 15em; overflow: hidden" tabindex="0">
              {{ qrCode }}
            </div>
          </template>
        </q-field>
      </div>
      <div class="row text-labels">
        <strong>¡Comparte tu código QR!</strong>
        <!-- <q-icon @click="handleCopy(qrCode)" name="content_copy"></q-icon> -->
      </div>
      <GeneratorQR id="qr_image" :text="qrCode" />
    </div>
  </q-card-actions>
</template>
<script setup>
import { Notify } from "quasar";
import { onBeforeMount, ref } from "vue";
import GeneratorQR from "../reader_qr/GeneratorQR.vue";

const handleCopy = (value, type = "text") => {
  const newNotify = (message, color) =>
    Notify.create({
      message,
      color,
    });
  // Copiar el texto
  navigator.clipboard
    .writeText(value)
    .then(() => newNotify("Copiado correctamente", "green"))
    .catch(() => newNotify("No se pudo copiar el token", "red"));
};

const changeAvatar = ref(false);

const input = ref({
  firstname: "",
  lastname: "",
  description: "",
});

const inputChange = ref({
  firstname: false,
  lastname: false,
  description: false,
});

const handleChangeData = (key) => {
  inputChange.value[key] = !inputChange.value[key];
};

onBeforeMount(() => {
  input.value = { ...allProps.user };
});

const allProps = defineProps({
  user: {
    type: Object,
  },
  toggle: {
    type: Function,
  },
  qrCode: {
    type: Object,
  },
});
</script>
<style scoped>
#container-profile {
  width: 25%;
  /* width: 30em; */
  min-width: 20em;
  max-width: 25%;
  overflow-y: auto;
  height: 100%;
}

.image-container {
  width: 10em;
  height: 10em;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-box-shadow: 3px 3px 14.5px 1px #808080;
  -moz-box-shadow: 3px 3px 14.5px 1px #808080;
  box-shadow: 3px 3px 14.5px 1px #808080;
  border: 1px solid transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-labels {
  width: 100%;
}

.text-labels {
  display: flex;
  align-items: center;
}

p {
  margin-top: 10px;
}
.data_shared {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
</style>
