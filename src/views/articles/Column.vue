<template>
<b-row>
  <b-col md="3">
    <b-card class="text-center">
      <b-avatar size="8rem" :src="user.avatar"></b-avatar>
      <p class="mt-2">
        {{ user.name }} 的专栏
      </p>
      <hr>
      <b-button exact-active-class="" block variant="light" :to="`/column/${user.id}`">
        <i class="fa fa-list-ul"></i>
        专栏文章 ({{ articleNum }})
      </b-button>
    </b-card>
  </b-col>

  <b-col md="9">
    <router-view></router-view>
  </b-col>
</b-row>
</template>

<script>

export default {
  props: ['userId'],
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = this.$store.getters.getUserById(this.userId)
  },
  computed: {
    articleNum() {
      return this.$store.getters.articleNumByUser(this.userId)
    }
  },
}
</script>
