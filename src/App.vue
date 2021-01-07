<template>
  <div id="app">
    <AppHeader class="app-header"></AppHeader>
    <router-view/>
  </div>
</template>
<script>
  import AppHeader from './components/Header.vue';

  export default {
    name: 'App',
    components: {
      AppHeader,
    },
  }
</script>

<style>
@font-face {
  font-family: "brown-font";
  src: url('~@/assets/fonts/Brown-Thin.eot') format('embedded-opentype'),
     url('~@/assets/fonts/Brown-Thin.woff') format('woff'),
     url('~@/assets/fonts/Brown-Thin.ttf') format('truetype');
  font-weight: 100;
}
@font-face {
  font-family: "brown-font";
  src: url('~@/assets/fonts/Brown-Light.eot') format('embedded-opentype'),
     url('~@/assets/fonts/Brown-Light.woff') format('woff'),
     url('~@/assets/fonts/Brown-Light.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: "brown-font";
  src: url('~@/assets/fonts/Brown-Regular.eot') format('embedded-opentype'),
     url('~@/assets/fonts/Brown-Regular.woff') format('woff'),
     url('~@/assets/fonts/Brown-Regular.ttf') format('truetype');
  font-weight: 600;
}
@font-face {
  font-family: "brown-font";
  src: url('~@/assets/fonts/Brown-Bold.eot') format('embedded-opentype'),
     url('~@/assets/fonts/Brown-Bold.woff') format('woff'),
     url('~@/assets/fonts/Brown-Bold.ttf') format('truetype');
  font-weight: 800;
}

body, html{
  margin:0;
  padding:0;
  background:none;
}
#app {
  font-family: brown-font, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-align: left;
  background:none;
}
h1{
  font-weight: 800;
}
</style>


