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
      <div style="width: 100%;" v-if="teamName">Active team: <span style="color: blue">{{ teamName }}</span></div>
      <LoginControls></LoginControls>
    </div>
  </nav>
</template>

<script>

import LoginControls from '@/components/LoginControls.vue'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'NavigationHeader',

  components: {
    LoginControls
  },

  data() {
    return {
      authStore: null
    }
  },

  computed: {
    teamName() {
      return this.authStore.getTeamName || "no team found"
    }
  },

  created() {
    this.authStore = useAuthStore();

  }
}
</script>
