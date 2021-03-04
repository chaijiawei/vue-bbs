<template>
  <div>
    <b-card header-html="
      <i class='fa fa-lock'></i> 修改密码
    ">
      <b-form @submit.prevent="submit">
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

        <b-button type="submit" variant="success">确认修改</b-button>

      </b-form>
    </b-card>
  </div>
</template>

<script>
import {required, minLength, sameAs} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      form: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
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
  methods: {
    submit() {
      this.$v.form.$touch()
      if(this.$v.form.$error) {
        return
      }

      this.$store.dispatch('updateUser', Object.assign(this.user, this.form))
      this.$swal({
        title: '密码修改成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        sameAs: sameAs('password')
      }
    }
  },
}
</script>
