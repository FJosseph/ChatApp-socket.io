<template>
    <div >
        <VueQrCode :value="text" :size="20"/>
    </div>
</template>
<script setup>
import VueQrCode from 'vue-qrcode'

defineProps({
  text: {
    type: String
  },
  style: {
    type: String
  }
})
</script>
<style>
    
</style>