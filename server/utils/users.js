// addUser (id, name, room)
// removeUser (id)
// getUser (id)
// getUserList (room)

// const users = []
//
// const addUser = (id, name, room) => {
//   users.push({ id, name, room })
// }
//
// module.exports = { addUser }

// class Person {
//   constructor (name, age) {
//     this.name = name
//     this.age = age
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// const me = new Person('Henrique', '36')
// console.log('this.name', me.name)
// console.log('this.age', me.age)
// const description = me.getUserDescription()
// console.log('description', description)

class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    const user = { id, name, room }

    this.users.push(user)

    return user
  }

  removeUser (id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    const user = this.users.filter(user => user.id === id)[0]

    return user
  }

  getUserList (room) {
    const users = this.users.filter(user => user.room === room)
    const namesArray = users.map(user => user.name)

    return namesArray
  }
}

module.exports = { Users }
