import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import { BootstrapVue } from 'bootstrap-vue'
import router from '@/router'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize'
import QuillEmoji from 'quill-emoji'
import {mockGetActiveUsers} from '@/mock/user'
import runMock from '@/mock'

//quill 插件
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/emoji', QuillEmoji)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(VueQuillEditor)

const isSeed = process.env.VUE_APP_IS_SEED === 'yes'
Vue.prototype.$isSeed = isSeed
if(isSeed) {
  runMock()
  store.commit('refreshUser')
  store.commit('refreshArticles')

  let users = store.getters.getActiveUsers
  mockGetActiveUsers(users)
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

