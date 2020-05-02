jest.mock('i18next', () => {
  const main = {
    use: jest.fn(),
    init: jest.fn()
  }
  main.use.mockImplementation(() => main)
  main.init.mockImplementation(() => main)
  return main
})
import i18n from '../i18n'

test('should initialized i18', () => {
  expect(i18n).toBeTruthy()
})
