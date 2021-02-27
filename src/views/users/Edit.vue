<template>
  <b-row>
    <b-col cols="3">
      <b-card>
        <b-list-group>
          <b-list-group-item :to="`/users/${id}/edit`">
            <i class="fa fa-cog"></i> 编辑资料
          </b-list-group-item>
          <b-list-group-item :to="`/users/${id}/edit/password`">
            <i class="fa fa-lock"></i> 修改密码
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-col>
    <b-col cols="9">
      <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>
import isLogined from '@/mixin/isLogined'

export default {
  props: ['id'],
  mixins: [isLogined],
  data() {
    return {
      isNotLoginedJumpUrl: '/'
    }
  }
}
</script>
