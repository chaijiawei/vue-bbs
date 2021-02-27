import {mapGetters} from 'vuex'
import _ from 'lodash'

export default {
    data() {
      return {
          isLoginedJumpUrl: '',
          isNotLoginedJumpUrl: '',
      }
    },
    computed: {
        ...mapGetters(['isLogined']),
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if(vm.isLogined) {
                _.isEmpty(vm.isLoginedJumpUrl)
                    ? next()
                    : next(vm.isLoginedJumpUrl)
            } else {
                _.isEmpty(vm.isNotLoginedJumpUrl)
                    ? next()
                    : next(vm.isNotLoginedJumpUrl)
            }
        })
    },
}
