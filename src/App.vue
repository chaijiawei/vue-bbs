<template>
  <div class="container">
    <TheHeader :public-path="publicPath"/>
  </div>
</template>

<script>
import { BootstrapVue } from 'bootstrap-vue'
import Vue from 'vue'
Vue.use(BootstrapVue)

import TheHeader from '@/components/layouts/TheHeader'

export default {
  name: 'App',
  components: {
    TheHeader
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
