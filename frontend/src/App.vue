<template>
  <section class="chat">
    <h1>Чат, где все молчат</h1>
    <Messages :messages="messages" />
    <MessagesForm @send-message="handleSendMessage" />
  </section>
</template>

<script setup lang="ts">
import Messages from './components/Messages.vue';
import MessagesForm from './components/MessageForm.vue';
import { onMounted, ref } from 'vue';
import { socket, getAllMessages } from './services/messageService';

const messages = ref<string[]>([]);

socket.addEventListener('message', ({ data }) => {
  messages.value.push(data);
})

const handleSendMessage = (message: string) => {
  socket.send(message);
}

onMounted(async () => {
  messages.value = await getAllMessages();
})

</script>

<style scoped>
  .chat {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto;
  }
</style>
