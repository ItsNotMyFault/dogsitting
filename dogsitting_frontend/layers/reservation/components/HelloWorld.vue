<!-- <script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script> -->
<script>
export default {
  name: 'HelloWorld'
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h1 class="green">bonjour</h1>
    <h3>
      You’ve successfully created a project with
      <a href="#" target="_blank" rel="noopener">Vite</a> +
      <a href="#" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>
