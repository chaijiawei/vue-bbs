import ls from "@/utils/localStorage"
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { CATEGORY_LIST } from '@/store/modules/article/_category'
import { FILTER_LIST } from '@/store/modules/article/_filter'

const initArticles = () => {
    return ls.getItem('articles') && _.isArray(ls.getItem('articles'))
        ? ls.getItem('articles')
        : [];
}

const state = () => ({
    articles: initArticles(),
    categories: CATEGORY_LIST,
    filters: FILTER_LIST
})

const mutations = {
    refreshArticles(state) {
        state.articles = initArticles()
    },
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
    },
}

const getters = {
    _getArticles: (state, getters) => (userId, categoryId) => {
        let articles = _.cloneDeep(state.articles)
        if(userId) {
            articles = _.filter(articles, article => article.user_id === userId)
        }
        if(categoryId) {
            articles = _.filter(articles, article => article.category_id === categoryId)
        }
        _.forEach(articles, function(article) {
            article.user = getters.getUserById(article.user_id)
            article.category = _.find(CATEGORY_LIST, category => category.id === article.category_id )
        })
        return _.orderBy(articles, ['updated_at'], ['desc'])
    },
    articles: (state, getters) => (userId = null) => {
        return getters._getArticles(userId)
    },
    getArticleById: (state, getters) => (articleId) => {
        let article = _.find(state.articles, article => article.id === articleId)
        if(article) {
            let user = getters.getUserById(article.user_id)
            article = Object.assign({}, article, {user})
            article.category = _.find(CATEGORY_LIST,
                    category => category.id === article.category_id)
        }
        return article
    },
    getArticleByFilter: (state, getters) => (filter, categoryId) => {
        let articles = getters._getArticles(null, categoryId)
        switch(_.toLower(filter)) {
            case 'vote':
                articles = _.orderBy(articles,
                    article => article.likeUsers ? article.likeUsers.length : 0,
                    ['desc'])
                break
            case 'recent':
                //do nothing
                break
            case 'noreply':
                articles = _.orderBy(_.filter(articles,
                    article => !article.comments || article.comments.length === 0),
                    ['updated_at'],
                    ['desc'])
                break
            default: //活跃
                articles = _.orderBy(articles,
                        article => article.comments ? article.comments.length : 0,
                    ['desc'])
               break
       }

       return articles
    },
    articleNum: state => state.articles.length,
    articleNumByUser: state => (userId) => {
        return _.filter(state.articles,
                article => article.user_id === userId
                ).length
    },
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
    },
    hotArticles: (state, getters) => _.slice(
        _.orderBy(getters._getArticles(),
        article => article.comments
            ? article.comments.length
            : 0, ['desc']),
        0, 7),

    getArticleByKeyword: (state, getters) => (searchVal, sort) => {
        let articles = _.cloneDeep(state.articles)

        articles = _.filter(articles, article => {
            let reg = new RegExp(searchVal, 'i')
            return reg.test(article.title) || reg.test(article.content)
        })

        _.forEach(articles, function(article) {
            let reg = new RegExp(`(${searchVal})`, 'ig')
            article.user = getters.getUserById(article.user_id)
            article.category = _.find(CATEGORY_LIST, category => category.id === article.category_id)
            let replace = '<span class="text-success font-weight-bold">$1</span>'
            article.title = article.title.replace(reg, replace)
            let contentIndex = article.content.search(reg)
            let from = 0
            let limit = 100
            if(contentIndex !== -1) {
                from = contentIndex
            }
            article.summary = article.content.substr(from, limit).replace(reg, replace)
            if(article.content.length > limit) {
                article.summary += ' ...'
            }
        })
        articles = _.orderBy(articles, ['updated_at'], ['desc'])
        switch(sort) {
            case 'like':
                articles = _.orderBy(articles, article => article.likeUsers
                    ? article.likeUsers.length
                    : 0, ['desc'])
                break
            case 'relative':
                articles = _.orderBy(articles,
                        article => article.title.indexOf(searchVal) === -1
                            ? -9999
                            : 233 - article.title.indexOf(searchVal),
                    ['desc'])
                break
        }
        return articles
    },

    categories: state => state.categories,

    filters: state => state.filters
}


export default {
    state,
    mutations,
    actions,
    getters,
}
