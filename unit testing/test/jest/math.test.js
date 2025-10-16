const { add, multiply, isEven } = require('../../src/math');

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('multiplies 2 * 3 to equal 6', () => {
  expect(multiply(2, 3)).toBe(6);
});

test('checks if 4 is even', () => {
  expect(isEven(4)).toBe(true);
});
