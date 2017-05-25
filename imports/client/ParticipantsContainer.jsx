import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import ParticipantsC from '/imports/collections/partecipants'
import Participants from '/imports/client/Participants'

const ParticipantsContainer = createContainer(() => {
  const participantsHandle = Meteor.subscribe('participants')
  const loading = !participantsHandle.ready()
  const participants = ParticipantsC.find({}).fetch()
  console.log(participants)
  return {
    loading,
    participants
  }
}, Participants)

export default ParticipantsContainer
