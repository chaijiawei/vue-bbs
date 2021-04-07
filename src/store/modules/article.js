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
        _.forEach(state.articles, (oldArticle, index) => {
            if(oldArticle.id === article.id) {
                oldArticle = Object.assign({}, oldArticle, article)
                state.articles[index] = oldArticle
                return false
            }
        })
        state.articles = _.cloneDeep(state.articles)
    },
    deleteArticle(state, articleId) {
        let articles = _.filter(state.articles, article => article.id !== articleId)
        state.articles = articles
    },
    addLikeUser(state, {articleId, userId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                if(!article.likeUsers) {
                    article.likeUsers = []
                }
                if(! _.find(article.likeUsers, likeUserId => likeUserId === userId)) {
                    article.likeUsers.push(userId)
                    state.articles[index] = article
                }
                return false
            }
        })
        state.articles = _.cloneDeep(state.articles)
    },
    removeLikeUser(state, {articleId, userId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                if(article.likeUsers) {
                    article.likeUsers =
                        _.filter(article.likeUsers,
                                likeUserId => likeUserId !== userId)
                    state.articles[index] = article
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
        state.articles = _.cloneDeep(state.articles)
    },

    updateComment(state, {articleId, commentId, content}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                let time = moment().format('YYYY-MM-DD HH:mm:ss')
                _.forEach(article.comments, (comment, index) => {
                    if(comment.id === commentId) {
                        article.comments[index].content = content
                        article.comments[index].updated_at = time
                        return false
                    }
                })
                state.articles[index] = article
                return false
            }
        })
        state.articles = _.cloneDeep(state.articles)
    },

    deleteComment(state, {articleId, commentId}) {
        _.forEach(state.articles, (article, index) => {
            if(article.id === articleId) {
                article.comments = _.filter(article.comments, comment => comment.id !== commentId)
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

    syncArticles({state}) {
        try {
            ls.setItem('articles', state.articles)
        } catch(err) {
            throw new Error('储存空间不足~')
        }
    },

    comment({commit, dispatch}, payload) {
        let commentId = uuidv4()
        payload.commentId = commentId
        commit('addComment', payload)
        dispatch('syncArticles')

        return commentId
    },

    updateComment({commit, dispatch}, payload) {
        commit('updateComment', payload)
        dispatch('syncArticles')
    },

    deleteComment({commit, dispatch}, payload) {
        commit('deleteComment', payload)
        dispatch('syncArticles')
    }
}

const getters = {
    _getArticles: (state, getters) => () => {
        let articles = _.cloneDeep(state.articles)
        _.forEach(articles, function(article) {
            article.user = getters.getUserById(article.user_id)
        })
        return _.orderBy(articles, ['updated_at'], ['desc'])
    },
    articles: (state, getters) => () => {
        return getters._getArticles()
    },
    getArticleById: (state, getters) => (articleId) => {
        let article = _.find(state.articles, article => article.id === articleId)
        if(article) {
            let user = getters.getUserById(article.user_id)
            article = Object.assign({}, article, {user})
        }
        return article
    },
    getArticleByFilter: (state, getters) => (filter) => {
        let articles
        switch(_.toLower(filter)) {
            case 'vote':
                articles = _.orderBy(getters._getArticles(),
                    article => article.likeUsers ? article.likeUsers.length : 0,
                    ['desc'])
                break
            case 'recent':
                articles = getters.articles()
                break
            case 'noreply':
                articles = _.orderBy(_.filter(getters._getArticles(),
                    article => !article.comments || article.comments.length === 0),
                    ['updated_at'],
                    ['desc'])
                break
            default: //活跃
                articles = _.orderBy(getters._getArticles(),
                        article => article.comments ? article.comments.length : 0,
                    ['desc'])
               break
       }

       return articles
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
        comments = _.orderBy(comments, comment => comment.updated_at, ['desc'])

        return comments
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
}
