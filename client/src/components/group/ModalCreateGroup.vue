<template>
    <q-card>
        <q-card-section class="q-pb-none q-pt-lg">
          <div class="text-h6 text-center">Agrega un nombre</div>
        </q-card-section>
        <q-form @submit="handleSubmit(input.name)">
        <q-card-section class="q-gutter-md q-pb-none">
            <q-input outlined v-model="input.name" dense placeholder="Mi nuevo grupo 🖖">
                <template v-slot:append>
                    <q-icon name="group" />
                </template>
            </q-input>
            <!-- <q-input outlined v-model="input.description" dense placeholder="Descripción">
                <template v-slot:append>
                    <q-icon name="description" />
                </template>
            </q-input> -->
        </q-card-section>
        <q-card-actions class="row justify-center q-pa-md">
            <q-btn :disable="!input.name.length" color="deep-purple-9" style="width: 100%" type="submit"
              >Crear grupo</q-btn
            >
        </q-card-actions>
    </q-form>
      </q-card>
</template>
<script setup>
import { ref } from "vue"

const input = ref({
    name: '',
    description: ''
})
defineProps({
    handleSubmit: {
        type: Function
    }
})
</script>
<style>
    
</style>