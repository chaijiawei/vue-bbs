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
    },
    updateArticle(state, article) {
        _.forEach(state.articles, (value, index, collection) => {
            if(value.id === article.id) {
                value = Object.assign({}, value, article)
                collection[index] = value
                return false
            }
        })
    },
    deleteArticle(state, articleId) {
        let articles = _.filter(state.articles, article => article.id !== articleId)
        state.articles = articles
    }
}

const actions = {
     createArticle({commit, dispatch}, article) {
        article.id = uuidv4()
        article.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        commit('addArticle', article)
        dispatch('syncArticles')

        return article.id
    },
    updateArticle({commit, dispatch}, article) {
        article.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
        commit('updateArticle', article)
        dispatch('syncArticles')
    },
    deleteArticle({commit, dispatch}, articleId) {
        commit('deleteArticle', articleId)
        dispatch('syncArticles')
    },
    syncArticles({state}) {
        ls.setItem('articles', state.articles)
    },
}

const getters = {
    articles: state => state.articles,
    getArticleById: (state, getters) => (articleId) => {
        let article = _.find(state.articles, (article) => article.id === articleId)
        if(article) {
            let user = getters.getUserById(article.user_id)
            article = Object.assign({}, article, {user})
        }
        return article
    },
}


export default {
    state,
    mutations,
    actions,
    getters,
}
