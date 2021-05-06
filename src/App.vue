<template>
  <div class="container" id="app">
    <the-header></the-header>
    <router-view v-if="isAlive"></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isAlive: true
    }
  },
  provide() {
    return {
      refresh: this.refresh,
    }
  },
  methods: {
    refresh() {
      this.isAlive = false
      this.$nextTick(() => {
        this.isAlive = true
      })
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

@import '~sweetalert2/src/sweetalert2';

@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.snow.css';
@import '~quill/dist/quill.bubble.css';
@import '~highlight.js/styles/default.css';

@import '~quill-emoji/dist/quill-emoji.css';
</style>
