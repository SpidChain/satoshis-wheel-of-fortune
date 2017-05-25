import {Meteor} from 'meteor/meteor'

import Blocknumber from '/imports/collections/blocknumber'

Meteor.publish('blocknumber', () => {
  /*
  return Lists.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
  */
  return Blocknumber.find()
})
