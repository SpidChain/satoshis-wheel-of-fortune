import {Meteor} from 'meteor/meteor'

import ParticipantsC from '/imports/collections/partecipants'

Meteor.publish('participants', () => {
  /*
  return Lists.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
  */
  return ParticipantsC.find()
})
