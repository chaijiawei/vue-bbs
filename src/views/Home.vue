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
        <article-list :articles="articles"></article-list>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
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
  beforeRouteEnter(to, from, next) {
    next( vm => {
      vm.articles = vm.$store.getters.articles()
    })
  },
}
</script>
