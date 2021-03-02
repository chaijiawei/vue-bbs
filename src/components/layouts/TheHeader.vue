<template>
  <b-navbar toggleable="lg" type="light" variant="info" class="my-3 bg-light">
    <b-navbar-brand  to="/">
      <img width="32" :src="logo.src" :alt="logo.title">
      <span class="title">{{ logo.title }}</span>
    </b-navbar-brand >

    <b-navbar-toggle target="vue-bbs-header-navbar"></b-navbar-toggle>

    <b-collapse id="vue-bbs-header-navbar" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(item) in navList" :key="item" href="#" >
          {{ item }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <TheEntry/>
  </b-navbar>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry'

export default {
  data() {
    return {
      logo: {
        src: process.env.BASE_URL + "logo.png",
        title: 'Learnku Vue.js'
      },
      navList: ['社区', '头条', '问答', '教程'],
    }
  },
  components: {
    TheEntry
  },
  methods: {

  },
}
</script>

<style scoped>
.title { display: none;}
</style>
