<template>
  <q-menu auto-close>
    <q-list style="min-width: 100px">
      <q-item clickable v-for="(option, i) in optionBanner" :key="i" @click="option.handleFunction">
        <q-item-section>{{ option.label }}</q-item-section>
      </q-item>
      <q-item clickable @click="logout"><q-item-section>Logout</q-item-section></q-item>
    </q-list>
  </q-menu>
</template>
<script setup>
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
// Router
const router = useRouter()

const logout = ()=>{
  storeUser.logout()
  router.push('/login')
}

const storeUser = useUserStore()
defineProps({
    optionBanner: {
        type: Array
    }
})
</script>
<style></style>
