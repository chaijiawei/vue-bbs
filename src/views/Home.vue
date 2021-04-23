<template>
  <div>
    <b-row>
      <b-col md="9">
        <b-card no-body>
          <b-card-header id="home-card-header" header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item link-classes="text-secondary" to="/">活跃</b-nav-item>
              <b-nav-item link-classes="text-secondary" to="topics?filter=vote">投票</b-nav-item>
              <b-nav-item link-classes="text-secondary" to="topics?filter=recent">最近</b-nav-item>
              <b-nav-item link-classes="text-secondary" to="topics?filter=noreply">零回复</b-nav-item>
            </b-nav>
          </b-card-header>

          <b-card-body>
            <article-list id="article-list" :articles="pageData"></article-list>
            <div class="mt-4">
              <b-pagination
                  v-if="havePageData"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  @change="onPageChange"
              ></b-pagination>
              <h3 class="text-center" v-else>
                <i class="far fa-grimace"></i>
                暂无数据
              </h3>
            </div>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col md="3">
        <slidebar></slidebar>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import ArticleList from '@/components/article/List'
import pagination from '@/mixin/pagination'
import Slidebar from '@/components/layouts/Slidebar'

export default {
  data() {
    return {
      articles: [],
      publicPath: process.env.BASE_URL,
      perPage: 20
    }
  },
  mixins: [pagination],
  components: {
    ArticleList,
    Slidebar
  },
  methods: {
    onPageChange() {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    setArticlesData(filter) {
      this.articles = this.$store.getters.getArticleByFilter(filter)
      this.setPageSource(this.articles)
    },
  },
  created() {
    this.setArticlesData(this.$route.query.filter)
  },
  beforeRouteUpdate(to, from, next) {
    this.resetPage()
    this.setArticlesData(to.query.filter)
    next()
  },
}
</script>
