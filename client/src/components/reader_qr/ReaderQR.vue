<template>
  <div>
    <!-- <video ref="videoElement" width="100%" height="auto"></video> -->
    <!-- <VueQrReader @decode=""/> -->
    <!-- <QrCapture @decode="onDecode"/> -->
    <qr-stream @decode="onDecode" class="mb">
      <div style="color: red; height: 10em;width: 20em;" class="frame"></div>
    </qr-stream>
    {{ dataQR }}
  </div>
</template>
<script setup>
import { ref } from "vue";
import { QrCapture, QrStream } from "vue3-qr-reader";

const dataQR = ref("");

const onDecode = (data) => {
  dataQR.value = data;
};
</script>
<style></style>
