<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavigationHeader from './components/NavigationHeader.vue'
</script>

<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <HelloWorld msg="You did it!" />
  <RouterView />
</template>
