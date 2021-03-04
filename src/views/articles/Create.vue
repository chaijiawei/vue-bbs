<template>
  <b-row align-h="center">
    <b-col md="8">
      <b-card header="发布文章">
        <b-form @submit.prevent="submit">
          <b-form-group :state="!$v.title.$error" :invalid-feedback="titleError">
            <b-form-input :state="$v.title.$error ? false : null" v-model="title" placeholder="请填写文章标题"></b-form-input>
          </b-form-group>
          <b-form-group :state="!$v.content.$error" :invalid-feedback="contentError">
            <quill-editor v-model="content"
                          :options="editorOption"
            >

            </quill-editor>
          </b-form-group>

          <b-button type="submit" variant="success">
            <i class="fa fa-reply"></i>
            发表
          </b-button>
        </b-form>
      </b-card>

    </b-col>
  </b-row>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        content: '',
        title: '',
        editorOption: {
          placeholder: '请填写文章内容',
        }
      }
    },
    computed: {
      ...mapGetters(['user']),
      titleError() {
        if(!this.$v.title.required) {
          return '请填写标题'
        }
        return ''
      },
      contentError() {
        if(!this.$v.content.required) {
          return '请填写文章内容'
        }
        return ''
      },
    },
    methods: {
      ...mapActions(['createArticle']),
      submit() {
        this.$v.$touch()
        if(this.$v.$error) {
          return
        }

        let article = {
          title: this.title,
          content: this.content,
          user_id: this.user.id
        }
        this.createArticle(article)

        this.$swal({
          title: '创建成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // this.$router.push('/')
        })
      }
    },
    validations: {
      title: {
        required,
      },
      content: {
        required,
      }
    }
  }
</script>
