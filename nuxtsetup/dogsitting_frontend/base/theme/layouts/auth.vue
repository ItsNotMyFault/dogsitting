<template>
  <div
    class="h-screen flex items-center justify-center overlay login-background"
    :style="'background-image: url(' + bgLogin + ')'"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const bgLogin = runtimeConfig.public.theme.light.bgLogin;

useHead({
  bodyAttrs: {
    class: "dark:bg-gray-950",
  },
});
</script>


<style scoped>
.login-background {
  background-size: cover !important;
}
</style>
