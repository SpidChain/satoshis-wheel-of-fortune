import {Meteor} from 'meteor/meteor'
import rp from 'request-promise-native'

import Blocknumber from '/imports/collections/blocknumber'
import ParticipantsC from '/imports/collections/partecipants'

Meteor.methods({
  addParticipants: (participants) => {
    ParticipantsC.remove({})
    participants
      .split('\n')
      .forEach((e) => ParticipantsC.insert({name: e.trim()}))
  },

  setBlocknumber: (blocknumber) => {
    if (Number.isInteger(blocknumber) && blocknumber >= 0) {
      Blocknumber.remove({})
      Blocknumber.insert({blocknumber})
    }
  },

  async getNonce () {
    const blockEntry = Blocknumber.findOne({})

    if (!blockEntry) {
      throw new Meteor.Error('NoBlockNumber', 'Block number not available')
    }

    const blocknumber = blockEntry.blocknumber

    try {
      const response = await rp({
        uri: `https://blockchain.info/block-height/${blocknumber}?format=json`,
        json: true
      })
      return {
        nonce: response.blocks[0].nonce,
        number: blocknumber
      }
    } catch (e) {
      throw new Meteor.Error('GetNonceError', 'Could not block retrieve nonce from blockchain.info')
    }
  }
})
