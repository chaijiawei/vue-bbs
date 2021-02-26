import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/utils/localStorage'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
    user: ls.getItem('user')
}

const mutations = {
    saveUser(state, user) {
        ls.setItem('user_database', user)
    },
    logoutUser(state) {
        state.user = null
        ls.removeItem('user')
    },
    updateUser(state, user) {
        state.user = user
        ls.setItem('user', user)
    },
}

const actions = {
    register({ commit }, user) {
        commit('saveUser', user)
        commit('updateUser', user)
    },
    logout({ commit }) {
        commit('logoutUser')
    },
    login({ commit }, user) {
        commit('updateUser', user)
    }
}

const getters = {
    isLogined: state => !_.isEmpty(state.user)
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})

export default store
