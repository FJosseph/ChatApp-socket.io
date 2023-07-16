<template>
    <div :id="id" class="flex row q-my-md" :class="sender === user_current?'justify-start':'justify-end'">
        <div class="flex row justify-center message-container">
            <div class="message sender text-start" v-if="sender === user_current">
                {{ message.text }}
            </div>
            <div class="message received text-start" v-else>
                {{ message.text }}
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    id: {type: String},
    user_current: {type: String},
    sender: {type: String},
    message: {
        type: Object
    }
})
</script>
<style>
.message-container{
    max-width: 35.5em;
}

.message{
    padding: 0.4em 0.5em;
    border-radius: 0.4em;
}
.sender{
    background: #a38af5d8;
}   
.received{
    background: #5aa4c1;
}
</style>