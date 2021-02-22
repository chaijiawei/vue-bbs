<template>
<b-card header="注册">
  <b-form @submit.prevent="submit">
    <b-form-group label="用户名" label-for="name"
      :invalid-feedback="nameError"
      :state="!$v.form.name.$error"
    >
      <b-form-input :class="{'is-invalid': $v.form.name.$error}" v-model="form.name" id="name"></b-form-input>
    </b-form-group>

    <b-form-group label="密码" label-for="password"
      :invalid-feedback="passwordError"
      :state="!$v.form.password.$error"
    >
      <b-form-input :class="{'is-invalid': $v.form.password.$error}" v-model="form.password" id="password" type="password"></b-form-input>
    </b-form-group>

    <b-form-group label="确认密码" label-for="password_confirmation"
      :invalid-feedback="passwordConfirmationError"
      :state="!$v.form.password_confirmation.$error"
    >
      <b-form-input :class="{'is-invalid': $v.form.password_confirmation.$error}" v-model="form.password_confirmation" id="password_confirmation" type="password"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="success">注册</b-button>
  </b-form>
</b-card>
</template>

<script>
import { required, minLength, maxLength, sameAs, } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {}
    }
  },
  computed: {
    nameError() {
      if(!this.$v.form.name.required) {
        return '请输入用户名'
      }

      if(!this.$v.form.name.minLength || !this.$v.form.name.maxLength) {
        return `用户名长度应为
        ${this.$v.form.name.$params.minLength.min}
        ~
        ${this.$v.form.name.$params.maxLength.max}
        个字符`
      }

      return ''
    },
    passwordError() {
      if(!this.$v.form.password.required) {
        return '请输入密码'
      }
      if(!this.$v.form.password.minLength) {
        return `密码至少为 ${this.$v.form.password.$params.minLength.min} 个字符`
      }

      return ''
    },
    passwordConfirmationError() {
      if(!this.$v.form.password_confirmation.sameAs) {
        return '两次输入的密码不一致'
      }

      return ''
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(10)
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        sameAs: sameAs('password')
      }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch()
      if(this.$v.form.$error) {
        return
      }
      console.log(this.form)
    }
  }
}
</script>
