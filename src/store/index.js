import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/utils/localStorage'

Vue.use(Vuex)

const state = {
    user: ls.getItem('user')
}

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user
        ls.setItem('user', user)
    }
}

const actions = {
    login({ commit }, user) {
        commit('UPDATE_USER', user)
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store
