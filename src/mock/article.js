import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { CATEGORY_LIST } from '@/store/modules/article/_category'

const Random = Mock.Random

const getArticle = (userIds) => {
    let dateTime = Random.datetime()
    return {
        id: uuidv4(),
        title: Random.title(),
        category_id: Random.pick(CATEGORY_LIST).id,
        user_id: Random.pick(userIds),
        content: Random.paragraph(),
        created_at: dateTime,
        updated_at: dateTime,
    }
}

const articleData = (num = 1, userIds = []) => {
    return _.times(num, () => getArticle(userIds))
}

export default articleData


