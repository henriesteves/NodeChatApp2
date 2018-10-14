const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Henrique'
    const text = 'Message text'
    const message = generateMessage(from, text)

    expect(message.from).toBe('Henrique')
    expect(message.text).toBe('Message text')
    expect(typeof message.createdAt).toBe('number')

    expect(message).toMatchObject({ from, text })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Lola'
    const latitude = 1
    const longitude = -1
    const url = `https://www.google.com.br/maps?q=${latitude},${longitude}`
    const message = generateLocationMessage(from, latitude, longitude)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({ from, url })
  })
})
