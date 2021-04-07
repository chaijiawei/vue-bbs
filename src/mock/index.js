import articleData from '@/mock/article'
import ls from "@/utils/localStorage"
import _ from 'lodash'

//清除文章
ls.removeItem('articles')

//设置文章数据
let articles = articleData(50)
ls.setItem('articles', articles)

//设置评论数据
import commentData from '@/mock/comment'
_.forEach(articles, (article, index) => {
    let comments = commentData(_.random(10, 30), article.id)
    articles[index].comments = comments
})
ls.setItem('articles', articles)




