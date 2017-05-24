Meteor.methods({
  addParticipants: (participants) => {
    console.log(participants, typeof participants)
    ParticipantsC.remove({})
    participants
      .split('\n')
      .forEach((e) => ParticipantsC.insert({name: e}))
  }
})
