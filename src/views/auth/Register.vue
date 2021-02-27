<template>
  <b-row align-h="center">
    <b-col cols="8">
      <b-card header="请注册">
        <b-form @submit.prevent="submit">
          <b-form-group label="用户名" label-for="name"
                        :invalid-feedback="nameError"
                        :state="!$v.form.name.$error"
          >
            <b-form-input :state="$v.form.name.$error ? false : null" v-model="form.name" id="name"></b-form-input>
          </b-form-group>

          <b-form-group label="密码" label-for="password"
                        :invalid-feedback="passwordError"
                        :state="!$v.form.password.$error"
          >
            <b-form-input :state="$v.form.password.$error ? false : null" v-model="form.password" id="password" type="password"></b-form-input>
          </b-form-group>

          <b-form-group label="确认密码" label-for="password_confirmation"
                        :invalid-feedback="passwordConfirmationError"
                        :state="!$v.form.password_confirmation.$error"
          >
            <b-form-input :state="$v.form.password_confirmation.$error ? false : null" v-model="form.password_confirmation" id="password_confirmation" type="password"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">注册</b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, maxLength, sameAs, } from 'vuelidate/lib/validators'
import isLogined from '@/mixin/isLogined'

export default {
  mixins: [isLogined],
  data() {
    return {
      form: {},
      isLoginedJumpUrl: '/',
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
      let user = {
        name: this.form.name,
        password: this.form.password
      }

      this.$store.dispatch('register', user)
      this.$swal({
        title: '注册成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.$router.push('/')
      })
    },
  }
}
</script>
