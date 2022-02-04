const Datreon = artifacts.require('./Datreon.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Datreon', ([deployer, author, tipper]) => {
  let datreon

  before(async () => {
    datreon = await Datreon.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await datreon.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await datreon.name()
      assert.equal(name, 'Datreon')
    })
  })


})