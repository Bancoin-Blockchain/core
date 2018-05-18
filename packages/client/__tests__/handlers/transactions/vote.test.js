const handler = require('../../../lib/handlers/transactions/vote')

let wallet
let transaction

beforeEach(() => {
  wallet = {
    address: 'DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh',
    balance: '6453530000000',
    publicKey: '0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0',
    secondPublicKey: '03791c7d0229966ee41af0e5362f3bb2534ef8c706d7151fec70aead607227fce1',
    votes: []
  }

  transaction = {
    id: '44d6f5ac5fbb6104ee250f6b5cb43401961114263499fd067922f3e2a9cb9d24',
    blockid: '5273958469976113749',
    type: 3,
    timestamp: 36345270,
    amount: 0,
    fee: 100000000,
    senderId: 'DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh',
    recipientId: 'DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh',
    senderPublicKey: '0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0',
    signature: '304402204da11f2677ea67ad3718520020eb2e2d43b5c83f947490d2b454ce3ec0f1dcba022011a00e3c3febdaf531a404d728b111812647c2f0e33df439c7cbae01dcb702ba', // eslint-disable-line max-len
    asset: {
      votes: [
        '+0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0'
      ]
    },
    confirmations: 19771
  }
})

describe('VoteHandler', () => {
  it('should be instantiated', () => {
    expect(handler.constructor.name).toBe('VoteHandler')
  })

  describe('canApply', () => {
    it('should be a function', () => {
      expect(handler.canApply).toBeFunction()
    })
  })

  describe('apply', () => {
    it('should be a function', () => {
      expect(handler.apply).toBeFunction()
    })

    it('should be ok', () => {
      expect(wallet.votes).toHaveLength(0)

      handler.apply(wallet, transaction)

      expect(wallet.votes).toHaveLength(1)
    })

    it('should not be ok', () => {
      wallet.votes = ['0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0']

      expect(wallet.votes).toHaveLength(1)

      handler.apply(wallet, transaction)

      expect(wallet.votes).toHaveLength(1)
    })
  })

  describe.only('revert', () => {
    it('should be a function', () => {
      expect(handler.revert).toBeFunction()
    })

    it('should be ok', () => {
      wallet.votes = ['0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0']

      expect(wallet.votes).toHaveLength(1)

      handler.revert(wallet, transaction)

      expect(wallet.votes).toHaveLength(0)
    })

    it('should not be ok', () => {
      wallet.votes = ['0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0']

      expect(wallet.votes).toHaveLength(1)

      transaction.asset.votes = ['+fake-publiKey']

      handler.revert(wallet, transaction)

      expect(wallet.votes).toHaveLength(1)
    })
  })

  describe('__determineExcessiveVotes', () => {
    it('should be a function', () => {
      expect(handler.__determineExcessiveVotes).toBeFunction()
    })

    it('should be ok', () => {
      wallet.votes = ['0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0']

      handler.__determineExcessiveVotes(wallet, transaction)

      expect(wallet.votesExceeded).toBeTruthy()
    })
  })

  describe('__canVoteFor', () => {
    it('should be a function', () => {
      expect(handler.__canVoteFor).toBeFunction()
    })

    it('should be ok', () => {
      expect(handler.__canVoteFor(wallet, transaction.asset.votes[0].slice(1))).toBeTruthy()
    })

    it('should not be ok', () => {
      wallet.votes = ['0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0']

      expect(handler.__canVoteFor(wallet, transaction.asset.votes[0].slice(1))).toBeFalsy()
    })
  })

  describe('__sort', () => {
    it('should be a function', () => {
      expect(handler.__sort).toBeFunction()
    })

    it('should be ok', () => {
      const sorted = handler.__sort(transaction)

      expect(sorted).toBeArray()
      expect(sorted).not.toBeEmpty()
    })
  })
})
