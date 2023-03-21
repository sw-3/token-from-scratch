const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token', ()=> {
	// tests go here...
	it('has a name', async ()=> {
		// fetch Token contract from blockchain
		const Token = await ethers.getContractFactory('Token')
		// deploy an instance of the Token to the blockchain
		let token = await Token.deploy()
		// Read token name
		const name = await token.name()
		// check that name is correct
		expect(name).to.equal('My Token')
	})
})
