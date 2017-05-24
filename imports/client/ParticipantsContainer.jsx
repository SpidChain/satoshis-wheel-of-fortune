import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Participants from '/imports/client/Participants'

export default ParticipantsContainer = createContainer(() => {
  const participantsHandle = Meteor.subscribe('participants')
  const loading = !participantsHandle.ready()
  const participants = ParticipantsC.find({}).fetch()
  console.log(participants)
  return {
    loading,
    participants
  }
}, Participants)
