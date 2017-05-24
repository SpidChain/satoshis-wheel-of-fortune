Meteor.publish('blocknumber', () => {
  /*
  return Lists.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
  */
  return Blocknumber.find()
});
