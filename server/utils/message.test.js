const expect = require('expect')

const { generateMessage } = require('./message')

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
