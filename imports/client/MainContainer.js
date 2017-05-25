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
  const number = blocknumber
    ? blocknumber.blocknumber
    : undefined
  console.log('participants', participants)
  console.log('blocknumber', blocknumber, number)
  return {
    loading,
    participants,
    blockNumber: number
  }
}, Main)

export default MainContainer
