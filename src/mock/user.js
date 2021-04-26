import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const Random = Mock.Random

let master = true

const getUser = () => {
    let dateTime = Random.datetime()
    let user
    if(master) {
        master = false
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

const userData = (num = 1) => _.times(num, getUser)

export default userData

export function mockGetActiveUsers(users) {
    Mock.mock(
        '/users/active',
        'get',
        users
    )
}
