<template>
  <div>
    <b-card>
      <b-card-title>
        <b-row>
          <b-col cols="8">
            <i class="fa fa-search text-secondary"></i> 关于
            <span class="text-success">{{ q }}</span>
            的搜索结果
            共 {{ this.articles.length }} 条
          </b-col>
          <b-col>
            <b-button
                @click="sort ==='relative'
                ? sort = ''
                : sort = 'relative';
                sortSearch()"
                :pressed="sort === 'relative'" class="mr-2" variant="outline-secondary">
              <i class="fa fa-random mr-1"></i>
              相关性排序
            </b-button>
            <b-button
                @click="sort ==='like'
                ? sort = ''
                : sort = 'like';
                sortSearch()"
                :pressed="sort === 'like'" variant="outline-secondary">
              <i class="fa fa-thumbs-up mr-1"></i>
              点赞排序
            </b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <hr>
      <article-list isSearch id="article-list" :articles="pageData"></article-list>
      <div class="mt-4" >
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
      q: '',
      sort: '',
    }
  },
  computed: {

  },
  mixins: [pagination],
  components: {
    ArticleList
  },
  created() {
    this.q = this.$route.query.q
    this.$store.commit('updateSearchVal', this.q)
    this.fetchArticles(this.q)
  },
  beforeRouteUpdate(to, from ,next) {
    this.$store.commit('updateSearchVal', to.query.q)
    this.q = to.query.q
    this.fetchArticles(to.query.q)
    next()
  },
  methods: {
    fetchArticles(q, sort) {
      this.articles = this.$store.getters.getArticleByKeyword(q, sort)
      this.setPageSource(this.articles)
    },
    onPageChange() {
      this.$nextTick(() => {
        document.querySelector('#article-list').scrollIntoView()
      })
    },
    sortSearch() {
      this.resetPage()
      this.fetchArticles(this.q, this.sort)
    }
  }
}
</script>
