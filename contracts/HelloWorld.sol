// SPDX-License-Identifier: UNLICENSED
// Line: 1 - Provide the license and The compiler does not validate it.

// Enable compiler to check specific solidity version that match with semver.
pragma solidity ^0.8.4;

// contract named "HelloWorld" - a simple Hello World.
contract HelloWorld {
    // create state variable uint or uint256 and store to `number` variable.
    uint256 number;

    // the contructor receive uint256 as argument and assign to global `number` when deployed.
    constructor(uint256 _number) {
        number = _number;
    }

    // public function to retrieve a `number` variable.
    function getNumber() public view returns (uint256) {
        return number;
    }

    // public function to set a `number` variable.
    function setNumber(uint256 _number) public {
        number = _number;
    }
}
