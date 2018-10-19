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
  font-size: 20px;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
}
body {
  margin: 0;
}
html, body, #app {
  height: 100%;
}
@media screen and (max-width: 430px) {
  .message-box-small {
    width: 320px;
  }
}
@media screen and (max-width: 800px) {
  .el-menu-vertical {
    text-align: left;
    position: absolute;
    top: 60px; bottom: 0;
    z-index: 1;
  }
  .el-main {
    margin-left: 64px;
  }
}
</style>
