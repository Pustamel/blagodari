<template>
  <div class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'HeaderComponent'
}
</script>

<style>


</style>