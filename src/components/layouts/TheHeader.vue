<template>
  <b-navbar toggleable="lg" type="light" variant="info" class="my-3 bg-light">
    <b-navbar-brand  to="/topics">
      <img width="32" :src="logo.src" :alt="logo.title">
      <span class="title">{{ logo.title }}</span>
    </b-navbar-brand >

    <b-navbar-toggle target="vue-bbs-header-navbar"></b-navbar-toggle>

    <b-collapse id="vue-bbs-header-navbar" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="category in categories" :key="category.id" :to="`/category/${category.id}`" >
          {{ category.name }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <search></search>

    <the-entry></the-entry>
  </b-navbar>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry'
import Search from '@/components/layouts/Search'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      logo: {
        src: process.env.BASE_URL + "logo.png",
        title: 'Learnku Vue.js'
      },
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  components: {
    TheEntry,
    Search
  },
  methods: {

  },
}
</script>

<style scoped>
.title { display: none;}
</style>
