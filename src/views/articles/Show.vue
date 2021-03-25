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

    <b-card class="mt-4" v-if="comments.length > 0">
      <b-card-sub-title class="mb-2">回复数量: {{ comments.length }}</b-card-sub-title>
      <ul class="list-unstyled" id="comments-list">
        <b-media :ref="comment.id" class="my-4" tag="li" v-for="comment in pageComments" :key="comment.id">
          <template #aside>
            <b-avatar :src="comment.user.avatar" class="mr-2"></b-avatar>
          </template>
          <h5>
            {{ comment.user.name }}
            <small class="ml-2"><i class="fa fa-clock-o"></i> <date :date-time="comment.created_at"></date></small>
          </h5>
          <div v-html="comment.content"></div>
        </b-media>
      </ul>
      <div class="mt-4">
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="comments-list"
        ></b-pagination>
      </div>
    </b-card>

    <b-card class="mt-4">
      <b-form @submit.prevent="onSubmitComment">
        <b-form-group>
          <quill-editor v-model="commentContent" :options="editorOption" @change="onEditorChange($event)">

          </quill-editor>
        </b-form-group>

        <b-button type="submit" variant="success">
          <i class="fa fa-reply"></i>
          回复
        </b-button>
      </b-form>
    </b-card>
  </div>

</template>

<script>
import Date from '@/components/Date'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import QrcodeVue from 'qrcode.vue'
import toolbarConfig from '@/config/quillToolbar'
import strip from 'strip'

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
      commentContent: '',
      editorOption: {
        placeholder: '请填写评论内容',
        modules: {
          syntax: true,
          imageDrop: true,
          imageResize: true,
          "emoji-toolbar": true,
          "emoji-textarea": false,
          "emoji-shortname": false,
          toolbar: toolbarConfig,
        },
      },
      comments: [],
      perPage: 5,
      currentPage: 1,
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
    },
    rows() {
      return this.comments.length
    },
    pageComments() {
      let start = (this.currentPage - 1) * this.perPage
      let end = start + this.perPage
      return _.slice(this.comments, start, end)
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
      this.comments = this.$store.getters.getArticleComments(this.id)
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
    },
    async onSubmitComment() {
      if(_.isEmpty(_.trim(strip(this.commentContent)))) {
        this.$swal({
          title: '请填写评论内容',
          icon: 'error'
        })

        return false
      }

      let commentId = await this.$store.dispatch('comment', {
        userId: this.loginUser.id,
        articleId: this.id,
        comment: this.commentContent
      })
      this.comments = this.$store.getters.getArticleComments(this.id)
      this.commentContent = ''
      this.currentPage = 1

      this.$nextTick(() => {
        let el = this.$refs[commentId][0]
        if(el) {
          el.scrollIntoView()
        }
      })
    },
    onEditorChange({html}) {
      this.commentContent = html
    },
  }
}
</script>

<style lang="scss">
  #article-container {
    img {
      max-width: 100%;
    }
  }
  .ql-editor {
    min-height: 150px
  }
</style>
