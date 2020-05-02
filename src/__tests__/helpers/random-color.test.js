import { getRandomColor } from '../../app/helpers/random-color';

test('should get random color', () => {
  const color = getRandomColor()
  expect(color.length).toBe(7)
})
