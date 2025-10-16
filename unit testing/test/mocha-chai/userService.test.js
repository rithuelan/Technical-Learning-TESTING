const { expect } = require('chai');
const sinon = require('sinon');
const fetch = require('node-fetch');
const getUser = require('../../src/userService');

describe('User Service', () => {
  beforeEach(() => {
    sinon.stub(fetch, 'default').resolves({
      json: () => Promise.resolve({ id: 1, name: 'Leanne Graham' })
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('fetches user data', async () => {
    const user = await getUser(1);
    expect(user.name).to.equal('Leanne Graham');
  });
});
