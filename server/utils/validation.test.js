const expect = require('expect')

const { isRealString } = require('./validation')

describe('generateMessage', () => {

  it('should reject non-string values', () => {
    const res = isRealString(1)

    expect(res).toBeFalsy()
  })

  it('should reject string with only spaces', () => {
    const res = isRealString('   ')

    expect(res).toBeFalsy()
  })

  it('should allow string with non-space characters', () => {
    const res = isRealString('  abc123   ')

    expect(res).toBeTruthy()
  })

})
