import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Main from '/imports/client/Main'

import Blocknumber from '/imports/collections/blocknumber'
import ParticipantsC from '/imports/collections/partecipants'

const MainContainer = createContainer(() => {
  const blocknumberHandle = Meteor.subscribe('blocknumber')
  const participantsHandle = Meteor.subscribe('participants')
  const loading = !(participantsHandle.ready() && blocknumberHandle.ready())
  const participants = ParticipantsC.find({}).fetch()
  const blocknumber = Blocknumber.findOne({})
  console.log('participants', participants)
  console.log('blocknumber', blocknumber)
  return {
    loading,
    participants,
    blocknumber
  }
}, Main)

export default MainContainer
