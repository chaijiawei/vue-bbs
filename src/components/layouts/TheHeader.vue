<template>
  <b-navbar toggleable="lg" type="light" variant="info" class="mt-3 bg-light">
    <b-navbar-brand  href="/">
      <img width="32" :src="logo.src" :alt="logo.title">
      <span class="title">{{ logo.title }}</span>
    </b-navbar-brand >

    <b-navbar-toggle target="vue-bbs-header-navbar"></b-navbar-toggle>

    <b-collapse id="vue-bbs-header-navbar" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(item, index) in navList" :key="index" href="#" >
          {{ item }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      logo: {
        src: `${this.publicPath}logo.png`,
        title: 'Learnku Vue.js'
      },
      navList: ['社区', '头条', '问答', '教程'],
    }
  },
  methods: {

  },
  props: {
    publicPath: String,
  }
}
</script>

<style scoped>
.title { display: none;}
</style>
