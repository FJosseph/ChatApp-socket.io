<template>
    <div class="container-form">
        <div class="" style="width: 90%;max-width: 30em;">
            <form-signin v-if="!changeForm"/>
            <form-signup v-else/>
        </div>
    </div>
</template>
<script setup>
import FormSignup from 'src/components/login/FormSignup.vue'
import FormSignin from 'src/components/login/FormSignin.vue';
import { provide, ref, watchEffect } from 'vue';
import { useUserStore } from 'src/stores/user-store';

// Store
const userStore = useUserStore()
watchEffect(()=>{
    // userStore.getUser()
})
const changeForm = ref(false)
provide('changeForm', changeForm)
</script>
<style>
.container-form{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* min-height: 100vh;
    background-image: url('https://wallpaperaccess.com/full/1146887.jpg'); */
}
.form {
  width: 100%;
  height: 100%;
}
</style>