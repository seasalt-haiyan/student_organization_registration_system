<template>
  <div id="app">
    <div :class="containerClass">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    // 根据路由判断是否显示特殊样式
    containerClass() {
      if (this.$route.path === '/' || this.$route.path === '/student' || this.$route.path === '/success') {
        return 'container';
      }
      return 'special-container';
    }
  },
}
</script>

<style>
body {
  text-align: center;
  margin: 0;
  background: #374865;
  position: relative;
}

a {
  text-decoration: none;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7e7;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.special-container {
  padding: 0;
}
</style>
