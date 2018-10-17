const expect = require('expect')

const { Users } = require('./users')

describe('Users', () => {

  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Henrique',
      room: 'React'
    }, {
      id: '2',
      name: 'Lola',
      room: 'Dogs'
    }, {
      id: '3',
      name: 'Freddy',
      room: 'React'
    }]
  })

  it('should add new user', () => {
    const users = new Users()
    const user = {
      id: '123',
      name: 'Henrique',
      room: 'React'
    }
    const resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toMatchObject([user])
  })

  it('should remove a user', () => {
    const userId =  '1'
    const user = users.removeUser(userId)

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', () => {
    var userId = '99'
    var user = users.removeUser(userId)

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3)
  })

  it('should find a user', () => {
    var userId = '2'
    var user = users.getUser(userId)

    expect(user.id).toBe(userId);
  })

  it('should not find a user', () => {
    var userId = '99'
    var user = users.getUser(userId)

    expect(user).toBeFalsy()
  })

  it('should return names for React room', () => {
    const userList = users.getUserList('React')

    expect(userList).toEqual(['Henrique', 'Freddy'])
  })

  it('should return names for Dogs room', () => {
    const userList = users.getUserList('Dogs')

    expect(userList).toEqual(['Lola'])
  })

})