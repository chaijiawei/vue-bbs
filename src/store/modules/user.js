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
        ls.setItem('user', user)
    },
    updateUser({ commit }, user) {
        try {
            ls.setItem('user_database', user)
            commit('updateUser', user)
            ls.setItem('user', user)
        } catch(err) {
            commit('updateUser', ls.getItem('user'))
            throw new Error('储存空间不足~')
        }
    }
}

const getters = {
    isLogined: state => !_.isEmpty(state.user),
    user: state => state.user,
    getUserById: () => () => ls.getItem('user_database')
}

export default {
    state,
    mutations,
    actions,
    getters,
}
