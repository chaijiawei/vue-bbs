<template>
  <div>
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

      <b-card-text id="article-container" v-html="content"></b-card-text>
      <b-card-text class="mt-5" v-if="isLogined">
        <b-button size="sm" :to="`/articles/${id}/edit`" class="mr-2" variant="outline-secondary">
          <i class="fa fa-edit"></i>
        </b-button>
        <b-button @click="onDelete" size="sm" variant="outline-danger">
          <i class="fa fa-trash"></i>
        </b-button>
      </b-card-text>
    </b-card>

    <b-card class="mt-4 text-center" sub-title="点赞">
      <div v-if="isLogined">
        <b-button variant="primary" v-if="!isLike" @click="like">点赞</b-button>
        <b-button variant="outline-primary" v-else @click="unlike">
          <i class="fa fa-thumbs-up"></i>
          已点赞
        </b-button>
        <b-button class="ml-2" variant="success" @click="showAwardModal=true">
          <i class="fa fa-award"></i>
          打赏
        </b-button>

        <b-modal v-model="showAwardModal">
          <qrcode-vue class="text-center" value="https://www.baidu.com"></qrcode-vue>
          <template #modal-footer>
            <div class="w-100 text-center text-secondary">
              感谢您的打赏 <i class="fa fa-heart text-success"></i>
            </div>
          </template>
        </b-modal>

      </div>

      <p class="mt-2">
        <span v-if="haveLikeUser">
            <b-avatar class="mr-2" :key="avatar" v-for="avatar in likeUserAvatars" :src="avatar"></b-avatar>
        </span>
        <span v-else-if="isLogined" class="text-secondary">
          成为第一个点赞的人吧
        </span>
      </p>
    </b-card>
  </div>

</template>

<script>
import Date from '@/components/Date'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import QrcodeVue from 'qrcode.vue'

export default {
  props: ['id'],
  data() {
    return {
      title: '',
      content: '',
      createdAt: '',
      user: {},
      likeUsers: [],
      showAwardModal: false,
    }
  },
  components: {
    Date,
    QrcodeVue
  },
  computed: {
    ...mapGetters({
      isLogined: 'isLogined',
      loginUser: 'user',
    }),
    isLike() {
      return Boolean(_.find(this.likeUsers,
          likeUserId => this.loginUser.id === likeUserId))
    },
    likeUserAvatars() {
      let avatars = []
      if(this.likeUsers) {
        _.forEach(this.likeUsers, likeUserId => {
          let likeUser = this.$store.getters.getUserById(likeUserId)
          avatars.push(likeUser.avatar)
        })
      }
      return avatars
    },
    haveLikeUser() {
      return !_.isEmpty(this.likeUsers)
    }
  },
  created() {
    let article = this.$store.getters.getArticleById(this.id)

    if(article) {
      document.title = this.title = article.title
      this.content = article.content
      this.createdAt = article.updated_at || article.created_at
      this.user = article.user
      this.likeUsers = this.$store.getters.likeUsers(this.id)
    }

    this.$nextTick(() => {
      this.$el.querySelectorAll('pre') &&
      this.$el.querySelectorAll('pre').forEach((block) => {
        window.hljs.highlightBlock(block);
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
    },
    like() {
      this.$store.dispatch('like', {
        articleId: this.id,
        userId: this.loginUser.id
      })
      this.likeUsers = this.$store.getters.likeUsers(this.id)
    },
    unlike() {
      this.$store.dispatch('unlike', {
        articleId: this.id,
        userId: this.loginUser.id
      })
      this.likeUsers = this.$store.getters.likeUsers(this.id)
    }
  }
}
</script>

<style lang="scss">
  #article-container {
    img {
      max-width: 100%;
    }
  }
</style>
