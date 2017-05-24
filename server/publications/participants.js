ParticipantsC.insert({name: 'ciro'})
ParticipantsC.insert({name: 'lorenzo'})
ParticipantsC.insert({name: 'duccio'})
Meteor.publish('participants', () => {
  /*
  return Lists.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
  */
  return ParticipantsC.find()
});
