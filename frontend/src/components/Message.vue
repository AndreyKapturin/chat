<template>
  <p class="message">
   <span class="message__username">{{ username }}</span> {{ messageText }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()

const [ username, messageText ] = props.message.split(': ');

</script>

<style scoped>
  .message {
    padding: 25px 10px 10px 10px;
    background-color: #18ed09;
    border-radius: 10px;
    position: relative;
  }
  .message__username {
    top: 5px;
    position: absolute;
    font-weight: 700;
  }
</style>