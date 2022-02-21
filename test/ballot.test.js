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

  describe('NewBallot', () => {
    it(`should Give 10 voters the right vote`, async () => {
      const proposals = [
        ethers.utils.formatBytes32String('John Doe'),
        ethers.utils.formatBytes32String('Jane Doe'),
        ethers.utils.formatBytes32String('Chuck Norris')
      ];

      const accounts = await ethers.getSigners();
      const chairperson = accounts[0];
      const voters = accounts.slice(1, 11); // only 10 persons

      console.log('charperson', chairperson.address);

      voters.map((voter, idx) => console.log(`voter ${idx} : `, voter.address));

      const Ballot = await ethers.getContractFactory('NewBallot');
      const ballot = await Ballot.deploy(proposals);
      await ballot.deployed();

      const promises = voters.map((voter) => {
        return ballot.connect(chairperson).giveRightToVote(voter.address);
      });

      await Promise.all(promises);

      // Voting with 10 voters (5 for no.2, 3 for no.1 and 2 for no.3)
      await ballot.connect(voters[0]).vote(0);
      await ballot.connect(voters[1]).vote(0);
      await ballot.connect(voters[2]).vote(0);
      await ballot.connect(voters[3]).vote(1);
      await ballot.connect(voters[4]).vote(1);
      await ballot.connect(voters[5]).vote(1);
      await ballot.connect(voters[6]).vote(1);
      await ballot.connect(voters[7]).vote(1);
      await ballot.connect(voters[8]).vote(2);
      await ballot.connect(voters[9]).vote(2);

      const winner = await ballot.winnerName(); // winner is no.2

      expect(ethers.utils.parseBytes32String(winner)).to.equal('Jane Doe');
    });
  });
});
