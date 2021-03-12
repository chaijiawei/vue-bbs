import ls from "@/utils/localStorage"
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const initArticles = () => {
    return ls.getItem('articles') && _.isArray(ls.getItem('articles'))
        ? ls.getItem('articles')
        : [];
}

const state = () => ({
    articles: initArticles(),
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
    },
    resetArticles(state, articles) {
        state.articles = articles
    }
}

const actions = {
     createArticle({commit, dispatch}, article) {
        article.id = uuidv4()
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        article.created_at = time
        article.updated_at = time
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
    syncArticles({state, commit}) {
        try {
            ls.setItem('articles', state.articles)
         } catch(err) {
            commit('resetArticles', initArticles())
            throw new Error('储存空间不足~')
        }
    },
}

const getters = {
    articles: (state, getters) => () => {
        let articles = Object.assign({}, state.articles)
        _.forEach(articles, function(article) {
            article.user = getters.getUserById(article.user_id)
        })
        articles = _.orderBy(articles, ['updated_at'], ['desc'])
        return articles
    },
    getArticleById: (state, getters) => (articleId) => {
        let article = _.find(state.articles, (article) => article.id === articleId)
        if(article) {
            let user = getters.getUserById(article.user_id)
            article = Object.assign({}, article, {user})
        }
        return article
    },
    articleNum: state => state.articles.length
}


export default {
    state,
    mutations,
    actions,
    getters,
}
