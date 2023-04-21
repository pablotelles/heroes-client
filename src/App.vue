<template>
  <nav>
    <router-link to="/">
      <img src="./assets/icons/dragonIcon.png" alt="">
    </router-link>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view/>
</template>


<style>
#app {
  margin: 0;
  padding: 0;
  padding-bottom: 3rem;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  background-color:  #1c1c1c;
  color: #d9d9d9;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}
img {
  width: 300px;
}
</style>
