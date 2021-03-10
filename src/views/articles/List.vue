<template>
  <b-card>
    <b-card-title>
      专栏文章
      <b-button v-if="isLogined" class="float-right" size="sm" variant="secondary" to="/articles/create">
        <i class="fa fa-pen"></i>
        创建文章
      </b-button>
    </b-card-title>

    <b-list-group flush>
      <b-list-group-item v-for="article in articles" :key="article.id">
        <b-avatar size="sm" :src="article.user.avatar" class="mr-2"></b-avatar>
        <b-link class="text-secondary text-decoration-none" :to="`/articles/${article.id}/show`">{{ article.title }}</b-link>
        <small class="float-right text-secondary">
          <date :date-time="article.updated_at || article.created_at"></date>
        </small>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
import Date from '@/components/Date'

export default {
  data() {
    return {
      articles: []
    }
  },
  components: {
    Date
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
