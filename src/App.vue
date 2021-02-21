<template>
  <div class="container">
    <TheHeader :public-path="publicPath"/>
    <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
      <b-button variant="primary" href="#">More Info</b-button>
    </b-jumbotron>
    <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
      <b-button variant="primary" href="#">More Info</b-button>
    </b-jumbotron>
    <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
      <b-button variant="primary" href="#">More Info</b-button>
    </b-jumbotron>
    <TheFooter/>
  </div>
</template>

<script>
import { BootstrapVue } from 'bootstrap-vue'
import Vue from 'vue'
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'

Vue.use(BootstrapVue)

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap-scss/bootstrap.scss";
@import "~bootstrap-vue/src/index";

$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/brands";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/solid";
@import "~@fortawesome/fontawesome-free/scss/v4-shims";
</style>
