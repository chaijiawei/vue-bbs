import Vue from 'vue'
import App from '@/App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from '@/router'
import Vuelidate from 'vuelidate'
import store from '@/store'
import VueSweetalert2 from 'vue-sweetalert2'
import VueQuillEditor from 'vue-quill-editor'

//quill 插件
import Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop);
import ImageResize from 'quill-image-resize'
Quill.register('modules/imageResize', ImageResize)
import QuillEmoji from 'quill-emoji'
Quill.register('modules/emoji', QuillEmoji)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(VueQuillEditor)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
