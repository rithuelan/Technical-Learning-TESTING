const { expect } = require('chai');
const { add, multiply, isEven } = require('../../src/math');

describe('Math Functions', () => {
  it('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).to.equal(5);
  });

  it('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).to.equal(6);
  });

  it('checks if 4 is even', () => {
    expect(isEven(4)).to.be.true;
  });
});
