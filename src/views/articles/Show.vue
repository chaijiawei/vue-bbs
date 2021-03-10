<template>
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
      <b-card-text class="mt-5" v-if="isLogined">
        <b-button size="sm" :to="`/articles/${id}/edit`" class="mr-2" variant="outline-secondary">
          <i class="fa fa-edit"></i>
        </b-button>
        <b-button @click="onDelete" size="sm" variant="outline-secondary">
          <i class="fa fa-trash"></i>
        </b-button>
      </b-card-text>
    </b-card>
</template>

<script>
import hljs from 'highlight.js'
import Date from '@/components/Date'
import {mapGetters} from 'vuex'

export default {
  props: ['id'],
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
  computed: {
    ...mapGetters(['isLogined'])
  },
  created() {
    let article = this.$store.getters.getArticleById(this.id)

    if(article) {
      document.title = this.title = article.title
      this.content = article.content
      this.createdAt = article.updated_at || article.created_at
      this.user = article.user
    }

    this.$nextTick(() => {
      this.$el.querySelectorAll('pre') &&
      this.$el.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
      })
    })
  },
  methods: {
    async onDelete() {
      let res = await this.$swal({
        title: '确认删除',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonColor: '#d33',
      })
      if(res.isConfirmed) {
        this.$store.dispatch('deleteArticle', this.id)
        await this.$swal({
          title: '删除成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
