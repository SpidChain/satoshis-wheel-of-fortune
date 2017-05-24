Meteor.methods({
  addParticipants: (participants) => {
    ParticipantsC.remove({})
    participants
      .split('\n')
      .forEach((e) => ParticipantsC.insert({name: e}))
  },

  setBlocknumber: (blocknumber) => {
    Blocknumber.remove({})
    Blocknumber.insert({blocknumber})
  }
})
