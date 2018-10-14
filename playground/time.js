// Jan 1st 1970 00:00:00 am -> 0
// milliseconds
// 1000 -> Jan 1st 1970 00:00:01 am
// 10000 -> Jan 1st 1970 00:00:10 am

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// const date = new Date()
//
// console.log(date) // 2018-10-14T10:55:52.479Z
// console.log(date.getDate()) // Returns the day of the month // 14
// console.log(date.getMonth()) // Returns the month (0-11) // 9
// console.log(date.getFullYear()) // Returns the year (4 digits for 4-digit years) // 2018

const moment = require('moment')

// https://momentjs.com/docs/#/parsing/string-format/

// const date = moment()

// console.log(date) // moment("2018-10-14T08:01:11.657")
// console.log(date.format()) // 2018-10-14T08:01:11-03:00
// console.log(date.format('MMM YYYY')) // Oct 2018
// console.log(date.format('MMM Do, YYYY')) // Oct 14th, 2018
//
// // https://momentjs.com/docs/#/manipulating/
//
// console.log(date.add(10, 'year').format()) // 2028-10-14T08:06:57-03:00
// console.log(date.add(5, 'year').subtract(9, 'months').format()) // 2033-01-14T08:08:38-02:00
//
// console.log(date.format('hh:mm a')) // 08:12 am
// console.log(date.format('h:mm a')) // 8:12 am

const someTimestamp = moment().valueOf()
console.log(someTimestamp)

const createdAt = 1234
const date = moment(createdAt)
console.log(date.format())