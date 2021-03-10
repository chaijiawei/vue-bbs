<template>
  <b-row align-h="center">
    <b-col cols="8">
      <b-card header="请登录">
        <b-form @submit.prevent="login">
          <b-form-group label="用户名" label-for="name">
            <b-form-input v-model="name" id="name"></b-form-input>
          </b-form-group>

          <b-form-group label="密码" label-for="password">
            <b-form-input v-model="password" id="password" type="password"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">登录</b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>

</template>

<script>
import ls from '@/utils/localStorage'
import isLogined from '@/mixin/isLogined'

export default {
  mixins: [isLogined],
  data() {
    return {
      name: '',
      password: '',
      isLoginedJumpUrl: '/',
    }
  },
  methods: {
    login() {
      if(! this.name) {
        this.$swal({
          title: '请输入用户名',
          icon: 'warning',
          confirmButtonText: '确认'
        })
        return
      }
      if(! this.password) {
        this.$swal({
          title: '请输入密码',
          icon: 'warning',
          confirmButtonText: '确认'
        })
        return
      }

      let user = ls.getItem('user_database')
      if(! user
          || user.password !== this.password
          || user.name !== this.name) {
        this.$swal({
          title: '用户名或者密码错误',
          icon: 'warning',
          confirmButtonText: '确认'
        })
        return
      }

      this.$store.dispatch('login', user)
      this.$swal({
        title: '登录成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then( () => {
        this.$router.back()
      })
    }
  }
}
</script>
