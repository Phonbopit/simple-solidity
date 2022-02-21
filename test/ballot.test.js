const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Ballot', function () {
  it(`should Give 'voter' the right to vote on this ballot`, async () => {
    const proposals = [
      ethers.utils.formatBytes32String('John Doe'),
      ethers.utils.formatBytes32String('Jane Doe'),
      ethers.utils.formatBytes32String('Chuck Norris')
    ];

    const [chairperson, voter1] = await ethers.getSigners();

    const Ballot = await ethers.getContractFactory('Ballot');
    const ballot = await Ballot.deploy(proposals);
    await ballot.deployed();

    await ballot.connect(chairperson).giveRightToVote(voter1.address);

    await ballot.connect(voter1).vote(2); // vote for index 2 = chuck norris

    const winner = await ballot.winnerName();
    expect(ethers.utils.parseBytes32String(winner)).to.equal('Chuck Norris');
  });
});
