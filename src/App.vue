<template>
    <div id="nav">
      <header-component/>
    </div>
</template>

<script>
import HeaderComponent from "./components/header/HeaderComponent"

export default {
  components: {
    HeaderComponent
  }
}
</script>

<style>

#app {
  margin: 0 80px;
  background: aliceblue;
  padding: 30px 20px 0 20px;
}
</style>
