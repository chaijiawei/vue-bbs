<template>
  <div>
    <b-row>
      <b-col md="9">
        <b-alert variant="success" show v-if="targetCategory !== null">
        {{ targetCategory.name }}：{{ targetCategory.descr }}
        </b-alert>
        <b-card no-body>
          <b-card-header id="home-card-header" header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item exact v-for="filter in filters" :key="filter.name"
                          link-classes="text-secondary"
                          :to="filter.filter ? `${$route.path}?filter=${filter.filter}` : $route.path">
                {{ filter.name }}
              </b-nav-item>
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
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      articles: [],
      publicPath: process.env.BASE_URL,
      perPage: 20,
      categoryId: '',
      isCreated: false,
    }
  },
  mixins: [pagination],
  components: {
    ArticleList,
    Slidebar
  },
  computed: {
    ...mapGetters(['filters', 'categories']),
    targetCategory() {
      if(!this.categoryId) {
        return null
      }

      let target = _.find(this.categories,
          category => category.id === this.categoryId)

      return target ?  target : null
    },
  },
  methods: {
    onPageChange() {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    setArticlesData(filter, categoryId) {
      this.articles = this.$store.getters.getArticleByFilter(filter, categoryId)
      this.setPageSource(this.articles)
    },

    fetchData(filter, categoryId) {
      this.resetPage()
      this.setArticlesData(filter, categoryId)
    },

    setTitle() {
      if(this.targetCategory) {
        document.title = `话题列表-${this.targetCategory.name}`
      }
    },

    init(categoryId, filter) {
      this.categoryId = categoryId
      this.setTitle()
      this.fetchData(filter, categoryId)
    }
  },
  created() {
    this.isCreated = true
    this.init(this.$route.params.categoryId, this.$route.query.filter)
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.params.categoryId, to.query.filter)
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.isCreated) {
        vm.isCreated = false
        return
      }
      vm.init(to.params.categoryId, to.query.filter)
    })
  }
}
</script>
