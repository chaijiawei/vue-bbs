<template>
  <div>
    <b-card no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item link-classes="text-secondary" to="/">活跃</b-nav-item>
          <b-nav-item link-classes="text-secondary" to="topics?filter=excellent">精华</b-nav-item>
          <b-nav-item link-classes="text-secondary" to="topics?filter=vote">投票</b-nav-item>
          <b-nav-item link-classes="text-secondary" to="topics?filter=recent">最近</b-nav-item>
          <b-nav-item link-classes="text-secondary" to="topics?filter=noreply">零回复</b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body>
        <article-list id="article-list" :articles="pageData"></article-list>
        <div class="mt-4">
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              @change="onPageChange"
          ></b-pagination>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
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
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query)
    next()
  }
}
</script>
