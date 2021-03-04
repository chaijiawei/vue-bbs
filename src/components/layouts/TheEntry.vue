<template>
  <b-navbar-nav v-if="isLogined" class="ml-auto">
    <b-nav-item-dropdown class="mr-3" right no-caret html="<i class='fa fa-plus'></i>">
      <b-dropdown-item to="/articles/create">
        <i class="fa fa-pen"></i>
        创建文章
      </b-dropdown-item>
    </b-nav-item-dropdown>

    <b-avatar :src="user.avatar"></b-avatar>
    <b-nav-item-dropdown :text="user.name" right>
      <b-dropdown-item to="/users/1/edit">
        <i class="fa fa-user-edit"></i>
        修改资料
      </b-dropdown-item>
      <b-dropdown-item @click="logout" href="#">
        <i class="fa fa-sign-out"></i>
        用户退出
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>

  <b-navbar-nav v-else class="ml-auto">
    <b-link to="/auth/login" class="btn btn-outline-info mr-2">
      <i class="fa fa-sign-in"></i>
      登录
    </b-link>
    <b-link to="/auth/register" class="btn btn-outline-info">
      <i class="fa fa-user-plus"></i>
      注册
    </b-link>
  </b-navbar-nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLogined', 'user']),
  },
  methods: {
    logout() {
      this.$swal({
        title: '确认退出',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonColor: '#d33',
      }).then(res => {
        if(res.isConfirmed) {
          this.$store.dispatch('logout')
          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        }
      })
    },
  }
}
</script>
