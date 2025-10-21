<template>
  <nav class="flex justify-between items-center shadow-md">

    <div class="navbar-left flex gap-6 p-4">
      <div>
        <img alt="Vue logo" class="logo" src="~/assets/dog_icon.svg" width="25" height="25" />
      </div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/team">Notre équipe</RouterLink>
      <RouterLink to="/pricing">Prix</RouterLink>
      <RouterLink to="/animal">Pensionnaires</RouterLink>
    </div>
    <div class="p-4">
      <UiUserMenuPopover />
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

const teamName = computed(() => authStore.getTeamName || "no team found")
</script>
