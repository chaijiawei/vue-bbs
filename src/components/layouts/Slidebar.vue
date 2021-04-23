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

      <b-button
          v-for="activeUser in activeUsers"
          :key="activeUser.id"
          class="mr-2 mb-2" pill variant="light"
          :to="{name: 'column.list', params: {userId: activeUser.id}}"
      >
        <b-avatar size="sm" class="mr-1"></b-avatar>
        {{ activeUser.name }}
      </b-button>
    </b-card>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeUsers: [],
    }
  },

  async created() {
    // this.activeUsers = this.$store.getters.getActiveUsers
    this.activeUsers = (await axios.get('/users/active')).data
  }
}
</script>

