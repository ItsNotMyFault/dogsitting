<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <HelloWorld msg="You did it!" />
  <RouterView />
</template>


<script>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import NavigationHeader from './components/NavigationHeader.vue'
export default defineComponent({
  components: { HelloWorld, NavigationHeader },

  setup(props) {

  }
})


</script>
