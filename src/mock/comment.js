import _ from "lodash"
import ls from "@/utils/localStorage"
import Mock from "mockjs"
import { v4 as uuidv4 } from 'uuid'

const articles = ls.getItem('articles')
const articleIds = _.flatMap(articles, (article) => article.id)

const Random = Mock.Random
const userId = ls.getItem('user_database').id
const getComment = (articleId) => {
    let dateTime = Random.datetime()
    return {
        id: uuidv4(),
        content: Random.sentence(),
        article_id: articleId ? articleId : Random.pick(articleIds),
        user_id: userId,
        created_at: dateTime,
        updated_at: dateTime,
    }
}

const commentData = (num = 1, articleId = '') => {
    return _.times(num, () => getComment(articleId))
}

export default commentData
