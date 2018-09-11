<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  font-size: 24px;
}
#app {
  text-align: center;
}
body {
  margin: 0;
}
html, body, #app {
  height: 100%;
}
</style>
