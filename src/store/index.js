import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import article from '@/store/modules/article'
import search from '@/store/modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        article,
        search
    }
})

export default store
