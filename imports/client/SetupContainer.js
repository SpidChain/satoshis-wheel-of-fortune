import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Setup from '/imports/client/Setup'

const SetupContainer = createContainer(() => {
  const userId = Meteor.userId()
  return {
    userId,
  }
}, Setup)

export default SetupContainer
