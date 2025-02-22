<template>
  <div class="messages" v-if="messages.length">
    <Message v-for="message in messages" :message="message" />
  </div>
  <p v-else>Нет сообщений</p>
</template>

<script setup lang="ts">
import Message from './Message.vue';

defineProps<{
  messages: string[]
}>()

</script>

<style scoped>
  .messages {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>