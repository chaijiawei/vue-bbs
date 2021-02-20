<template>
  <div id="wrap">
    <TheHeader :public-path="publicPath"/>
  </div>
</template>

<script>
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
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/bootstrap";
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/brands";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/solid";
@import "~@fortawesome/fontawesome-free/scss/v4-shims";

body > .container { margin-top: 15px;}
</style>
