<template>
  <form class="messages-form" @submit.prevent="handleSubmit">
    <input class="messages-form__input" type="text" name="username" placeholder="Ваше имя" v-model="userName">
    <textarea class="messages-form__textarea" name="message" placeholder="Сообщение" v-model="messageText"></textarea>
    <button class="messages-form__send-button" type="submit">Отправить</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'sendMessage', message: string): void
}>()

const savedUserName = localStorage.getItem('userName');
const userName = ref<string>('');
const messageText = ref<string>('');

if (savedUserName) {
  userName.value = savedUserName
}

const handleSubmit = (): void => {
  const userNameRegExp = new RegExp('\\p{L}{2,20}', 'u');

  if (userNameRegExp.test(userName.value)) {
    emit('sendMessage', `${userName.value}:  ${messageText.value}`);
    
    if (savedUserName !== userName.value) {
      localStorage.setItem('userName', userName.value);
    }

    messageText.value = '';
  } else {
    alert('Представься!')
  }
}

</script>

<style scoped>
  .messages-form {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .messages-form__input {
    border-radius: 10px;
    padding: 5px;
  }
  .messages-form__textarea {
    border-radius: 10px;
    padding: 5px;
    resize: vertical;
  }
  .messages-form__send-button {
    padding: 5px;
    border-radius: 10px;
    font-weight: 700;
  }
  .messages-form__send-button:hover {
    cursor: pointer;
  }
</style>