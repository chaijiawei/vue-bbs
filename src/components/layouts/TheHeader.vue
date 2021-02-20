<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img width="32" :src="logo.src" :alt="logo.title">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      logo: {
        src: `${this.publicPath}logo.png`,
        title: 'Learnku Vue.js'
      }
    }
  },
  props: {
    publicPath: String,
  }
}
</script>

<style scoped>
.title { display: none;}
</style>
