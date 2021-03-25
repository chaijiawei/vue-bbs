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
    },
    addLikeUser(state, {articleId, userId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                if(!state.articles[index].likeUsers) {
                    state.articles[index].likeUsers = []
                }
                if(! _.find(state.articles[index].likeUsers, likeUserId => likeUserId === userId)) {
                    state.articles[index].likeUsers.push(userId)
                }
                return false
            }
        })
    },
    removeLikeUser(state, {articleId, userId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                if(state.articles[index].likeUsers) {
                    state.articles[index].likeUsers =
                        _.filter(state.articles[index].likeUsers,
                                likeUserId => likeUserId !== userId)
                }

                return false
            }
        })
    },
    addComment(state, {userId, articleId, comment, commentId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                if(!article.comments) {
                    article.comments = []
                }
                let time = moment().format('YYYY-MM-DD HH:mm:ss')
                article.comments.push({
                    id: commentId,
                    content: comment,
                    article_id: articleId,
                    user_id: userId,
                    created_at: time,
                    updated_at: time,
                })
                state.articles[index] = article
                return false
            }
        })
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
    like({commit, dispatch}, likeData) {
        commit('addLikeUser', likeData)
        dispatch('syncArticles')
    },
    unlike({commit, dispatch}, likeData) {
        commit('removeLikeUser', likeData)
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

    comment({commit, dispatch}, payload) {
        let commentId = uuidv4()
        payload.commentId = commentId
        commit('addComment', payload)
        dispatch('syncArticles')

        return commentId
    }
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
        let article = _.find(state.articles, article => article.id === articleId)
        if(article) {
            let user = getters.getUserById(article.user_id)
            article = Object.assign({}, article, {user})
        }
        return article
    },
    articleNum: state => state.articles.length,
    likeUsers: (state, getters) => (articleId) => {
        let article = getters.getArticleById(articleId)

        return article.likeUsers ? article.likeUsers : []
    },
    getArticleComments: (state, getters) => (articleId) => {
        let article = getters.getArticleById(articleId)
        if(_.isEmpty(article.comments)) {
            return []
        }
        let comments = _.cloneDeep(article.comments)
        _.forEach(comments, (comment, index) => {
            comments[index].user = getters.getUserById(comment.user_id)
        })
        comments = _.orderBy(comments, comment => comment.created_at, ['desc'])

        return comments
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
}
