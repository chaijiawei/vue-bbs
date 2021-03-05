<template>
  <span>{{ fromNow }}</span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    dateTime: String,
  },
  computed: {
    fromNow() {
      return moment(this.dateTime).locale('zh-CN').fromNow()
    }
  }
}
</script>
