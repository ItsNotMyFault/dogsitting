<template>
  <nav class="wrapper">
    <img alt="Vue logo" class="logo" src="@/assets/dog_icon.svg" width="25" height="25" />
    <div class="navbar-left">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/teams">Notre équipe</RouterLink>
      <RouterLink to="/pricing">Prix</RouterLink>
      <RouterLink to="/reserve">Réserver</RouterLink>
      <RouterLink to="/activites">Activitées</RouterLink>
      <RouterLink to="/location">Lieu</RouterLink>
    </div>
    <div class="navbar-right">
      <button>asdf</button>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationHeader',
}
</script>
