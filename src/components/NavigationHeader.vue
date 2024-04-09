<template>
  <nav class="wrapper">

    <div class="navbar-left">
      <div>
        <img alt="Vue logo" class="logo" src="@/assets/dog_icon.svg" width="25" height="25" />
      </div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/teams">Notre équipe</RouterLink>
      <RouterLink to="/pricing">Prix</RouterLink>
      <RouterLink to="/reserve">Réserver</RouterLink>
      <RouterLink to="/activites">Activitées</RouterLink>
      <RouterLink to="/dogs">Pensionnaires</RouterLink>
    </div>
    <div class="navbar-right">
      <div>Summary</div>
      <LoginControls></LoginControls>
    </div>
  </nav>
</template>

<script>

import LoginControls from '@/components/LoginControls.vue'

export default {
  name: 'NavigationHeader',

  components: {
    LoginControls
  }
}
</script>
