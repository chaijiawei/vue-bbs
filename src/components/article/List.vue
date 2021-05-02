<template>
  <b-list-group flush>
    <b-list-group-item v-for="article in articles" :key="article.id">
      <b-avatar  v-b-popover.hover.top="article.user.name" size="sm" :src="article.user.avatar" class="mr-2"></b-avatar>
      <b-link class="text-secondary text-decoration-none"
              :to="{
                name: 'articles.show',
                params: {userId: article.user_id, id: article.id}
              }"
      >
        <span v-if="isSearch" v-html="article.title"></span>
        <span v-else>{{ article.title }}</span>
      </b-link>
      <small class="float-right text-secondary">
        <span v-b-popover.hover.top="`点赞数`">
          <i class="fa fa-thumbs-o-up"></i> {{ article.likeUsers ? article.likeUsers.length : 0 }}
        </span>
        &bull;
        <span v-b-popover.hover.top="`评论数`">
          <i class="fa fa-comment-o"></i> {{ article.comments ? article.comments.length : 0 }}
        </span>
        &bull;
        <span v-b-popover.hover.top="article.updated_at" >
          <i class="fa fa-clock-o"></i> <date :date-time="article.updated_at"></date>
        </span>
      </small>

      <p class="my-2" v-if="isSearch" v-html="article.summary"></p>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import Date from '@/components/Date'

export default {
  props: {
    articles: Array,
    isSearch: Boolean
  },
  data() {
    return {

    }
  },
  computed: {

  },
  components: {
    Date
  },
  methods: {

  },
  created() {
  }
}
</script>
