<template>
  <b-card>
    <b-card-title>
      专栏文章
      <b-button v-if="isLogined" class="float-right" size="sm" variant="secondary" to="/articles/create">
        <i class="fa fa-pen"></i>
        创建文章
      </b-button>
    </b-card-title>

    <article-list :articles="articles"></article-list>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import ArticleList from '@/components/article/List'

export default {
  data() {
    return {
      articles: []
    }
  },
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters(['isLogined'])
  },
  beforeRouteEnter(to, from, next) {
    next( vm => {
      vm.articles = vm.$store.getters.articles()
    })
  },
}
</script>
