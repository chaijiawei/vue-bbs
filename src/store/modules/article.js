import ls from "@/utils/localStorage"
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const state = () => ({
    articles: ls.getItem('articles') && _.isArray(ls.getItem('articles'))
            ? ls.getItem('articles')
            : [],
})

const mutations = {
    addArticle(state, article) {
        state.articles.push(article)
    }
}

const actions = {
    createArticle({commit, dispatch}, article) {
        article.id = uuidv4()
        article.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        commit('addArticle', article)
        dispatch('syncArticles');
    },
    syncArticles({state}) {
        ls.setItem('articles', state.articles)
    },
}

const getters = {

}


export default {
    state,
    mutations,
    actions,
    getters,
}
