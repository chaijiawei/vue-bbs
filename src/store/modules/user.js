import ls from "@/utils/localStorage"
import _ from "lodash"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment";

const USER_DATABASE = 'user_database'

const state = () => ({
    user: ls.getItem('user'),
})

const mutations = {
    updateUser(state, user) {
        state.user = user
    },
    refreshUser(state) {
        state.user = ls.getItem('user')
    },
}

const saveToDatabase = (user) => {
    let oldUsers = ls.getItem(USER_DATABASE) ? ls.getItem(USER_DATABASE) : {}

    oldUsers[user.id] = user
    ls.setItem(USER_DATABASE, oldUsers)
}

const actions = {
    register({ commit }, user) {
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        user.created_at = time
        user.updated_at = time
        user.id = uuidv4()
        commit('updateUser', user)
        ls.setItem('user', user)
        saveToDatabase(user)
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
            user.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            commit('updateUser', user)
            ls.setItem('user', user)
            saveToDatabase(user)
        } catch(err) {
            throw new Error('储存空间不足~')
        }
    },
}

const getters = {
    isLogined: state => !_.isEmpty(state.user),
    user: state => state.user,
    getUserById: () => (id) => {
        let users = ls.getItem(USER_DATABASE) ? ls.getItem(USER_DATABASE) : {}
        return users[id] ? users[id] : null
    },
    retrieveUser: () => (name) => {
        let users = ls.getItem(USER_DATABASE) ? ls.getItem(USER_DATABASE) : {}

        return _.find(users, user => user.name === name)
    },
    getActiveUsers: (state, getters) => {
        let articles = getters.articles()
        let users = {}
        _.forEach(articles, article => {
            _.forEach(article.comments, comment => {
                if(users[comment.user_id]) {
                    users[comment.user_id].commentsNum += 1
                } else {
                    users[comment.user_id] = Object.assign({}, {
                        commentsNum: 0,
                    }, getters.getUserById(comment.user_id))
                }
            })
        })
        users = _.orderBy(users, user => user.commentsNum, ['desc'])

        return _.slice(users, 0, 5)
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
