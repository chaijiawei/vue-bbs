<template>
  <b-card>
    <b-card-title>
      专栏文章
      <b-button v-if="isLogined" class="float-right" size="sm" variant="secondary" to="/articles/create">
        <i class="fa fa-pen"></i>
        创建文章
      </b-button>
    </b-card-title>

    <article-list id="article-list" :articles="pageData"></article-list>
    <div class="mt-4">
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          @change="onPageChange"
      ></b-pagination>
    </div>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import ArticleList from '@/components/article/List'
import pagination from '@/mixin/pagination'

export default {
  data() {
    return {
      articles: [],
    }
  },
  mixins: [pagination],
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  created() {
    this.setArticlesData()
  },
  methods: {
    onPageChange() {
      this.$nextTick(() => {
        document.querySelector('#article-list').scrollIntoView()
      })
    },
    setArticlesData() {
      this.articles = this.$store.getters.articles()
      this.setPageSource(this.articles)
    },
  }
}
</script>
