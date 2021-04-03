import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import ls from "@/utils/localStorage";

const Random = Mock.Random
const userId = ls.getItem('user_database').id

const getArticle = () => {
    let dateTime = Random.datetime()
    return {
        id: uuidv4(),
        title: Random.ctitle(),
        user_id: userId,
        content: Random.csentence(1, 5),
        created_at: dateTime,
        updated_at: dateTime,
    }
}

const articleData = (num = 1) => _.times(num, getArticle)

export default articleData


