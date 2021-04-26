<template>
  <div>
    <b-card>
      <template #header>
        <div class="text-center">
          实战课程
        </div>
      </template>

      <b-carousel controls
                  indicators
                  background="#ababab"
      >
        <a target="_blank" href="https://www.bilibili.com/">
          <b-carousel-slide img-blank>
            实战课程一
          </b-carousel-slide>
        </a>

        <a target="_blank" href="https://www.baidu.com/">
          <b-carousel-slide img-blank>
            实战课程二
          </b-carousel-slide>
        </a>
        <a href="#">
          <b-carousel-slide img-blank>
            实战课程三
          </b-carousel-slide>
        </a>
      </b-carousel>
    </b-card>

    <b-card class="my-4">
      <template #header>
        <div class="text-center">
          活跃用户
        </div>
      </template>

      <div>
        <b-button
            v-for="activeUser in activeUsers"
            :key="activeUser.id"
            class="mr-2 mb-2" pill variant="light"
            :to="{name: 'column.list', params: {userId: activeUser.id}}"
        >
          <b-avatar size="sm" class="mr-1"></b-avatar>
          {{ activeUser.name }}
        </b-button>
      </div>
    </b-card>

    <b-card class="my-4">
      <template #header>
        <div class="text-center">
          热门文章
        </div>
      </template>

      <b-list-group flush>
        <b-list-group-item :to="{
          name: 'articles.show',
          params: {
            userId: hotArticle.user_id,
            id: hotArticle.id
          }
        }"
          :key="hotArticle.id"
          v-for="hotArticle in hotArticles">
          {{ hotArticle.title }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeUsers: [],
      hotArticles: [],
    }
  },

  async created() {
    this.activeUsers = this.$isSeed
        ? (await axios.get('/users/active')).data
        : this.$store.getters.getActiveUsers

    this.hotArticles = this.$store.getters.hotArticles
    console.log(this.hotArticles)
  }
}
</script>

