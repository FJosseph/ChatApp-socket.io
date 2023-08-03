<template>
    <q-toolbar id="toolbar_mobile" class="q-pa-md">
    <!-- <q-btn v-if="mobile" round flat size="10px" icon="arrow_back_ios"></q-btn> -->
              <q-avatar class="q-ml-none">
                <img
                  :src="
                    userCurrent.avatar ??
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                />
              </q-avatar>
              <q-toolbar-title class="text-subtitle1 text-weight-medium

">
                {{ `${userCurrent.fullname}` }}
              </q-toolbar-title>
              <q-btn flat round dense icon="close" @click="userCurrent = null"/>
            </q-toolbar>
</template>
<script setup>
import { inject } from "vue"

const userCurrent = inject('user-current')
defineProps({
    userCurrent: {type: Object},
    mobile: {type: Boolean}
})
</script>
<style>
#toolbar_mobile{
    background: white;
  position: absolute;
  width: 100%;
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 10px 10px; */
  z-index: 10;
  border-bottom: 1px solid #d3d3d363;
}
    
</style>