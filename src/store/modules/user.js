import ls from "@/utils/localStorage";
import _ from "lodash";

const state = () => ({
    user: ls.getItem('user'),
})

const mutations = {
    updateUser(state, user) {
        state.user = user
    },
}

const actions = {
    register({ commit }, user) {
        user.id = _.random(1, 9999)
        ls.setItem('user_database', user)
        commit('updateUser', user)
        ls.setItem('user', user)
    },
    logout({ commit }) {
        commit('updateUser', null)
        ls.removeItem('user')
    },
    login({ commit }, user) {
        commit('updateUser', user)
    },
    updateUser({ commit }, user) {
        ls.setItem('user_database', user)
        commit('updateUser', user)
        ls.setItem('user', user)
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
