const Staking = artifacts.require('./staking.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('staking', ([deployer, author, tipper]) => {
  let staking
  
  before(async () => {
    staking = await Staking.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await staking.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const test = await staking.test()
      assert.equal(test, 'test string')
    })
  })
})