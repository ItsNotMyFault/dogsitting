<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <HelloWorld msg="You did it!" />
  <RouterView />
  <footer style="color: blue">
    <MyFooter></MyFooter>
  </footer>
</template>


<script>
import HelloWorld from '@components/HelloWorld.vue'
import NavigationHeader from '@components/NavigationHeader.vue'
import MyFooter from '@components/MyFooter.vue'
export default {
  components: {
    HelloWorld,
    NavigationHeader,
    MyFooter
  },
}


</script>
