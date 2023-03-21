const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', ()=> {
	let token

	beforeEach(async () => {
		// fetch Token from blockchain
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('ScottW3 Token', 'SW3T', '100000000')
	})

	describe('Deployment', () => {
		const name = 'ScottW3 Token'
		const symbol = 'SW3T'
		const decimals = 18
		const totalSupply = tokens('100000000')

		it('has correct name', async ()=> {
			expect(await token.name()).to.equal(name)
		})

		it('has correct symbol', async ()=> {
			expect(await token.symbol()).to.equal(symbol)
		})

		it('has correct decimals', async ()=> {
			expect(await token.decimals()).to.equal(decimals)
		})

		it('has correct totalSupply', async ()=> {
			expect(await token.totalSupply()).to.equal(totalSupply)
		})

	})


})
