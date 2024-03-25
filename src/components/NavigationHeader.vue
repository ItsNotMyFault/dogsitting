<template>
  <nav class="wrapper">
    <img alt="Vue logo" class="logo" src="@/assets/dog_icon.svg" width="25" height="25" />
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/team">Notre équipe</RouterLink>
    <RouterLink to="/reserve">Réserver</RouterLink>
  </nav>
</template>

<script>
export default {}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  /* margin: 0 auto 2rem; */
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>
