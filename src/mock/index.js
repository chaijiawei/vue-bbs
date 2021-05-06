import articleData from '@/mock/article'
import userData from '@/mock/user'
import commentData from '@/mock/comment'
import ls from "@/utils/localStorage"
import _ from 'lodash'

//清除用户
const clearUser = () => {
    ls.removeItem('user')
    ls.removeItem('user_database')
}

//填充用户数据
const seedUser = () => {
    let users = userData(10)
    users.push(userData(1, true)[0])
    let usersObj = {}
    _.forEach(users, user => {
        usersObj[user.id] = user
    })
    ls.setItem('user', usersObj[1])
    ls.setItem('user_database', usersObj)
    const userIds = []
    _.forEach(usersObj, user => {
        userIds.push(user.id)
    })

    return {users, usersObj, userIds}
}

//清除文章
const clearArticle = () => {
    ls.removeItem('articles')
}

//设置文章数据
const seedArticle = (userIds) => {
    let articles = articleData(100, userIds)
    ls.setItem('articles', articles)
    return articles
}


//设置评论数据
const seedComment = (articles, userIds) => {
    _.forEach(articles, (article, index) => {
        let comments = commentData(_.random(10, 30), article.id, userIds)
        articles[index].comments = comments
    })
    ls.setItem('articles', articles)
}

export default () => {
    clearUser()
    let {userIds} = seedUser()
    clearArticle()
    let articles = seedArticle(userIds)
    seedComment(articles, userIds)
}

export const clear = () => {
    clearUser()
    clearArticle()
}





