<template>
  <b-row align-h="center">
    <b-col md="8">
      <b-card header="发布文章">
        <b-form @submit.prevent="submit">
          <b-form-group>
            <b-form-input v-model="title" placeholder="请填写文章标题"></b-form-input>
          </b-form-group>
          <b-form-group>
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
    methods: {
      submit() {
        console.log(this.content)
      }
    }
  }
</script>
