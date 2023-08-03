<template>
   <q-toolbar class="">
    <!-- <q-btn v-if="mobile" round flat size="10px" icon="arrow_back_ios"></q-btn> -->
              <q-avatar class="q-ml-none">
                <img
                  :src="
                    userCurrent.avatar ??
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                />
              </q-avatar>
              <q-toolbar-title>
                {{ `${userCurrent.fullname}` }}
              </q-toolbar-title>
              <q-btn flat round dense icon="more_vert" />
            </q-toolbar>
</template>
<script setup>
defineProps({
    userCurrent: {type: Object},
    mobile: {type: Boolean}
})
</script>
<style>
    
</style>