<template>
  <header>
    <NavigationHeader></NavigationHeader>
  </header>
  <main>
    <RouterView />
  </main>
  <MyFooter></MyFooter>
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

  created() {
    console.log('created reserve', this.$router.currentRoute.value);
  }
}


</script>
