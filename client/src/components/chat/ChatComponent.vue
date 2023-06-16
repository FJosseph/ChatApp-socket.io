<template>
    <div id="chats_container_last" class="q-pa-sm" style="height: 100%;width: 100%;overflow-y: scroll;padding-top: 5em;padding-bottom: 4em;">
        <div v-for="(e,i) in messages" :key="i">
            asds
        </div>
    </div>
</template>
<script setup>
defineProps({
    messages: {
        type: Array
    }
})
</script>
<style scoped>
#chats_container_last{
    /* background: url('https://brunty.me/files/chat-bgs/1.0/blue-pink-20-pct.png'); */
    background-color: #e6e7e7;
    background-size: contain;
}
</style>