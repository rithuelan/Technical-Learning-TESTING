const getUser = require('../../src/userService');
const fetch = require('node-fetch');

jest.mock('node-fetch');

test('fetches user data', async () => {
  fetch.mockResolvedValue({
    json: () => Promise.resolve({ id: 1, name: 'Leanne Graham' }),
  });

  const user = await getUser(1);
  expect(user.name).toBe('Leanne Graham');
});
