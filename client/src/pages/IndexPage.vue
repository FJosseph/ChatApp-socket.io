<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";
import { computed, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

const storeUser = useUserStore();

// Router
const auth = computed(()=>storeUser.isAuthtenticated)

</script>
<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/1146887.jpg");
}
</style>
