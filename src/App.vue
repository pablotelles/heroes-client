<template>
  <nav>
    <router-link to="/">
      <img src="./assets/icons/dragonIcon.png" alt="">
    </router-link>
  </nav>
  <router-view/>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
/* nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
} */
img {
  width: 300px;
}
</style>
