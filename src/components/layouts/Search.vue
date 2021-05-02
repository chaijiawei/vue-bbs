<template>
  <b-nav-form @submit.prevent="search" class="mr-2">
    <b-form-input v-model.trim="searchVal" type="search" placeholder="搜索..."></b-form-input>
    <b-button class="ml-2" variant="primary" type="submit">搜索</b-button>
  </b-nav-form>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    searchVal: {
      get() {
        return this.$store.getters.searchVal
      },
      set(value) {
        this.$store.commit('updateSearchVal', value)
      }
    }
  },
  methods: {
    search() {
      if(this.searchVal !== '') {
        let query = {q: this.searchVal}
        if(this.$route.name === 'search'
            && this.$route.query.q === query.q) {
          query.t = Date.now()
        }
        this.$router.push({name: 'search', query})
      }
    }
  }
}
</script>
