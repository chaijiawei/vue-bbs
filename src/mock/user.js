import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const Random = Mock.Random

const getUser = (isMaster = false) => {
    let dateTime = Random.datetime()
    let user
    if(isMaster) {
        user = {
            id: '1',
            name: 'cjw',
            password: 'password',
            created_at: dateTime,
            updated_at: dateTime,
        }
    } else {
        user = {
            id: uuidv4(),
            name: Random.name(),
            password: Random.string(8),
            created_at: dateTime,
            updated_at: dateTime,
        }
    }

    return user
}

const userData = (num = 1, isMaster = false) =>
    _.times(num,
        () => getUser(isMaster))

export default userData

export const mockGetActiveUsers = users => {
    Mock.mock(
        '/users/active',
        'get',
        users
    )
}
