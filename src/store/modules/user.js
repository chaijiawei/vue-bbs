import ls from "@/utils/localStorage";
import _ from "lodash";

const state = () => ({
    user: ls.getItem('user'),
})

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
    },
    updateUser({ commit }, user) {
        ls.setItem('user_database', user)
        commit('updateUser', user)
    }
}

const getters = {
    isLogined: state => !_.isEmpty(state.user),
    user: state => state.user,
}

export default {
    state,
    mutations,
    actions,
    getters,
}
