<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <HelloWorld msg="You did it!" />
  <RouterView />
  <button @click="increment()">Count is: {{ count }}</button>
</template>


<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavigationHeader from './components/NavigationHeader.vue'
import { defineAsyncComponent } from 'vue'

import { ref } from 'vue'
const count = ref(0)

// Methods are functions that mutate state and trigger updates.
// They can be bound as event handlers in templates.
function increment() {
  this.count++
}

</script>
