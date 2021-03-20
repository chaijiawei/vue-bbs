<template>
  <b-row align-h="center">
    <b-col md="8">
      <b-card :header="id ? '编辑文章' : '发布文章'">
        <b-form @submit.prevent="submit">
          <b-form-group :state="!$v.title.$error" :invalid-feedback="titleError">
            <b-form-input :state="$v.title.$error ? false : null" v-model="title" placeholder="请填写文章标题"></b-form-input>
          </b-form-group>
          <b-form-group :state="!$v.text.$error" :invalid-feedback="contentError">
            <quill-editor v-model="content" :options="editorOption" @change="onEditorChange($event)">
            </quill-editor>
          </b-form-group>

          <b-button type="submit" variant="success">
            <span v-if="id">
              <i class="fa fa-edit"></i>
              修改
            </span>
            <span v-else>
              <i class="fa fa-reply"></i>
              发表
            </span>
          </b-button>
        </b-form>
      </b-card>

    </b-col>
  </b-row>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import {mapGetters, mapActions} from 'vuex'
  import isLogined from '@/mixin/isLogined'
  import toolbarConfig from '@/config/quillToolbar'

  export default {
    props: ['id'],
    data() {
      return {
        content: '',
        text: '',
        title: '',
        editorOption: {
          placeholder: '请填写文章内容',
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
        isNotLoginedJumpUrl: '/'
      }
    },
    beforeRouteLeave (to, from, next) {
      this.content = ''
      this.text = ''
      this.title = ''
      next()
    },
    created() {
      this.initArticle()
    },
    mixins: [isLogined],
    computed: {
      ...mapGetters(['user']),
      titleError() {
        if(!this.$v.title.required) {
          return '请填写标题'
        }
        return ''
      },
      contentError() {
        if(!this.$v.text.required) {
          return '请填写文章内容'
        }
        return ''
      },
    },
    methods: {
      ...mapActions(['createArticle', 'updateArticle']),
      async submit() {
        this.$v.$touch()
        if(this.$v.$error) {
          return
        }

        try {
          let article, articleId
          if(this.id) { //修改
            articleId = this.id
            article = {
              id: this.id,
              title: this.title,
              content: this.content,
            }
            this.updateArticle(article)
          } else { //创建
            article = {
              title: this.title,
              content: this.content,
              user_id: this.user.id,
            }
            articleId = await this.createArticle(article)
          }

          this.$swal({
            title: this.id ? '修改成功' : '创建成功',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push({name: 'articles.show', params: {id: articleId}})
          })
        } catch(err) {
          this.$swal({
            title: this.id ? '修改失败' : '创建失败',
            text: err.message,
            icon: 'error',
          })
        }
      },
      beforeRouteEnterHook() {
        this.initArticle()
      },

      initArticle() {
        if(this.id) {
          let article = this.$store.getters.getArticleById(this.id)
          let {content, title} = article
          this.content = content
          this.text = content
          this.title = title
        }
      },

      onEditorChange({html, text}) {
        this.content = html
        this.text = text
      },
    },
    validations: {
      title: {
        required,
      },
      text: {
        required,
      }
    }
  }
</script>

<style>
.ql-editor {
  min-height: 250px
}
</style>
