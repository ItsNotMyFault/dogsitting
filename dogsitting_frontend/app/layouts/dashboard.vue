<template>
  <div class="flex h-screen w-full bg-default">
    <div class="flex min-w-0 grow flex-col h-full">
      <UPageHeader>
        <NavigationHeader>
        </NavigationHeader>
      </UPageHeader>
      <main class="flex-1 overflow-auto">
        <div class="h-full">
          <UApp>
            <NuxtPage />
          </UApp>
        </div>
        <UPageBody />
      </main>
    </div>
  </div>
</template>