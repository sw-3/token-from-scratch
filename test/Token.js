const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', ()=> {
	let token, accounts, deployer, receiver

	beforeEach(async () => {
		// fetch Token from blockchain
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('ScottW3 Token', 'SW3T', '100000000')

		// fetch accounts
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		receiver = accounts[1]
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

		it('assigns total supply to deployer', async ()=> {
			expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
		})


	})

	describe('Sending Tokens', () => {
		let amount, transaction, result

		describe('Success', () => {

			beforeEach(async () => {
				amount = tokens(100)
				transaction = await token.connect(deployer).transfer(receiver.address, amount)
				result = await transaction.wait()
			})

			it('transfers token balances', async () => {
				// ensure that tokens were transfered (balance changed)
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(99999900))
				expect(await token.balanceOf(receiver.address)).to.equal(amount)
			})

			it('emits Transfer event', async () => {
				const event = result.events[0]
				expect(event.event).to.equal('Transfer')

				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(receiver.address)
				expect(args.value).to.equal(amount)
			})

		})

		describe('Failure', () => {

			it('rejects insufficient balances', async () => {
				const invalidAmount = tokens(1000000000)		// 1 billion
				await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
			})

			it('rejects invalid recipient', async () => {
				amount = tokens(100)
				await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
			})
			
		})

	})

})
