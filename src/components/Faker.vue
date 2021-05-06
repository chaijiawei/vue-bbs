<template>
  <div class="ml-3">
    <i title="我是一个工具" style="cursor:pointer" class="fa fa-tools" @click="showBtn=!showBtn"></i>
    <div v-if="showBtn">
      <b-button size="sm" @click="seed" variant="primary" class="mr-1">填充数据</b-button>
      <b-button size="sm" @click="clear" variant="danger">清空数据</b-button>
    </div>
  </div>
</template>

<script>
import runMock from '@/mock'
import { clear } from '@/mock'

export default {
  data() {
    return {
      showBtn: false
    }
  },
  inject: ['refresh'],
  methods: {
    async seed() {
      let res = await this.$swal({
        title: '确认填充数据',
        text: '测试用户密码：怕死沃德',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
      if(res.isConfirmed) {
        runMock()
        this._refresh()
      }
    },
    async clear() {
      let res = await this.$swal({
        title: '确认清除数据',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonColor: '#d33',
      })
      if(res.isConfirmed) {
        clear()
        this._refresh()
      }
    },
    _refresh() {
      this.showBtn = false
      this.$store.commit('refreshUser')
      this.$store.commit('refreshArticles')
      this.refresh()
      // window.location.reload(true)
    },
  }
}
</script>
