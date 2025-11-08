<template>
  <div class="h-screen flex items-center justify-center overlay login-background"
    :style="'background-image: url(' + bgLogin + '); height: 100vh; background-size: cover; background-position: center;'">
    <slot />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const bgLogin = runtimeConfig.public.theme.light.bgLogin;


</script>
