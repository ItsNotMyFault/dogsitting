<template>
  <nav class="wrapper">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/dog_icon.svg" width="25" height="25" /> -->
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/team">Notre équipe</RouterLink>
    <RouterLink to="/reserve">Réserver</RouterLink>
  </nav>
</template>

<script>
export default {
  name: 'NavigationHeader'
}
</script>
