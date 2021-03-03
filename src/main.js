import Vue from 'vue'
import App from '@/App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from '@/router'
import Vuelidate from 'vuelidate'
import store from '@/store'
import VueSweetalert2 from 'vue-sweetalert2'
import VueQuillEditor from 'vue-quill-editor'

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
