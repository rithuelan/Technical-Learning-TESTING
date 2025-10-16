const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const { registerUser, loginUser } = require('../../src/auth');

describe('Auth Module', () => {
  beforeEach(() => {
    sinon.stub(fs, 'readFileSync').returns(JSON.stringify({}));
    sinon.stub(fs, 'writeFileSync').returns();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('registers a new user successfully', () => {
    expect(registerUser('Alice', '1234')).to.be.true;
  });

  it('throws error if user exists', () => {
    fs.readFileSync.restore();
    sinon.stub(fs, 'readFileSync').returns(JSON.stringify({ Alice: { password: '1234' } }));
    expect(() => registerUser('Alice', '1234')).to.throw('User exists');
  });

  it('login returns token for valid user', () => {
    fs.readFileSync.restore();
    sinon.stub(fs, 'readFileSync').returns(JSON.stringify({ Bob: { password: 'pass' } }));
    expect(loginUser('Bob', 'pass')).to.equal('token123');
  });

  it('login throws error for invalid credentials', () => {
    fs.readFileSync.restore();
    sinon.stub(fs, 'readFileSync').returns(JSON.stringify({ Bob: { password: 'pass' } }));
    expect(() => loginUser('Bob', 'wrong')).to.throw('Invalid credentials');
  });
});
