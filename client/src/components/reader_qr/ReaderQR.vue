<template>
  <div>
    <!-- <video ref="videoElement" width="100%" height="auto"></video> -->
    <!-- <VueQrReader @decode=""/> -->
    <!-- <QrCapture @decode="onDecode"/> -->
    <q-btn @click="showScan = !showScan">Escanea el código</q-btn>
        <qr-stream v-if="showScan" :camera="'auto'" @decode="onDecode" class="q-pa-sm">
          <div style="color: red; height: 10em;width: 10em;" class="frame"></div>
        </qr-stream>
    {{ dataQR }}
  </div>
</template>
<script setup>
import { ref } from "vue";
import { QrCapture, QrStream } from "vue3-qr-reader";

const showScan = ref(false)

const dataQR = ref("");

const onDecode = (data) => {
  dataQR.value = data;
};
</script>
<style></style>
