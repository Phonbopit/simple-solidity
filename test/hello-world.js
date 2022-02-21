const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('HelloWorld', function () {
  it(`should return new number once it's changed`, async () => {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const helloWorld = await HelloWorld.deploy(1); // set default to 1
    await helloWorld.deployed();

    const initialNumber = await helloWorld.getNumber();
    expect(initialNumber).to.equal(1);

    await helloWorld.setNumber(100);
    const newNumber = await helloWorld.getNumber();
    expect(newNumber).to.equal(100);
  });
});
