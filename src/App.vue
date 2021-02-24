<template>
  <div class="container" id="app">
    <TheHeader :public-path="publicPath"/>
    <router-view></router-view>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
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
