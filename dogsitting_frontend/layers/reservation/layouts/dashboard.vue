<template>
  <div class="flex h-full w-full min-h-0">
    <div class="flex min-w-0 grow flex-col">
      <header>
        <NavigationHeader></NavigationHeader>
      </header>
      <main>
        <div>
          <NuxtPage />
        </div>
      </main>
      <MyFooter></MyFooter>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
