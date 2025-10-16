const fs = require('fs');
const { registerUser, loginUser } = require('../../src/auth');

jest.mock('fs');

beforeEach(() => {
  fs.readFileSync.mockReturnValue(JSON.stringify({}));
  fs.writeFileSync.mockImplementation(() => {});
});

test('registers a new user successfully', () => {
  expect(registerUser('Alice', '1234')).toBe(true);
});

test('throws error if user exists', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify({ Alice: { password: '1234' } }));
  expect(() => registerUser('Alice', '1234')).toThrow('User exists');
});

test('login returns token for valid user', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify({ Bob: { password: 'pass' } }));
  expect(loginUser('Bob', 'pass')).toBe('token123');
});

test('login throws error for invalid credentials', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify({ Bob: { password: 'pass' } }));
  expect(() => loginUser('Bob', 'wrong')).toThrow('Invalid credentials');
});
