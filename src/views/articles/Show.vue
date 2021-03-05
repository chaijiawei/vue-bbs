<template>
  <b-row align-h="center">
    <b-col>
      <b-card>
        <b-card-title class="text-center">
          {{ title }}
        </b-card-title>
        <small class="d-block text-secondary text-center">
          <i class="fa fa-user"></i> {{ user.name }}
          &bullet;
          <i class="fa fa-clock-o"></i> <date :date-time="createdAt"></date>
        </small>

        <hr>
        <b-card-text v-html="content"></b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import hljs from 'highlight.js'
import Date from '@/components/Date'

export default {
  data() {
    return {
      title: '',
      content: '',
      createdAt: '',
      user: {},
    }
  },
  components: {
    Date
  },
  created() {
    let articleId = this.$route.params.id
    let article = this.$store.getters.getArticleById(articleId)

    if(article) {
      this.title = article.title
      this.content = article.content
      this.createdAt = article.created_at
      this.user = article.user
    }

    this.$nextTick(() => {
      this.$el.querySelectorAll('pre') &&
      this.$el.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
      })
    })
  },
}
</script>

<style>
@import '~highlight.js/styles/default.css';
</style>
