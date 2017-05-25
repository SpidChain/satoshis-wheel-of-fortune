import {Meteor} from 'meteor/meteor'

import Blocknumber from '/imports/collections/blocknumber'
import ParticipantsC from '/imports/collections/partecipants'

Meteor.methods({
  addParticipants: (participants) => {
    ParticipantsC.remove({})
    participants
      .split('\n')
      .forEach((e) => ParticipantsC.insert({name: e}))
  },

  setBlocknumber: (blocknumber) => {
    if (Number.isInteger(blocknumber) && blocknumber >= 0) {
      Blocknumber.remove({})
      Blocknumber.insert({blocknumber})
    }
  }
})
