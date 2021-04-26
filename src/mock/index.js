import articleData from '@/mock/article'
import userData from '@/mock/user'
import commentData from '@/mock/comment'
import ls from "@/utils/localStorage"
import _ from 'lodash'

//清除用户
ls.removeItem('user')
ls.removeItem('user_database')

//填充用户数据
let users = userData(10)
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

//清除文章
ls.removeItem('articles')

//设置文章数据
let articles = articleData(100, userIds)
ls.setItem('articles', articles)

//设置评论数据
_.forEach(articles, (article, index) => {
    let comments = commentData(_.random(10, 30), article.id, userIds)
    articles[index].comments = comments
})
ls.setItem('articles', articles)




