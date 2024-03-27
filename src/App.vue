<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <HelloWorld msg="You did it!" />
  <RouterView />
</template>


<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavigationHeader from './components/NavigationHeader.vue'
import { defineAsyncComponent } from 'vue'

</script>
