import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import App from '/imports/client/App'
import Blocknumber from '/imports/collections/blocknumber'
import ParticipantsC from '/imports/collections/partecipants'

const AppContainer = createContainer(() => {
  const userId = Meteor.userId()
  const blocknumberHandle = Meteor.subscribe('blocknumber')
  const participantsHandle = Meteor.subscribe('participants')
  const loading = !(participantsHandle.ready() && blocknumberHandle.ready())
  const participants = ParticipantsC.find({}).fetch()
  const blocknumber = Blocknumber.findOne({})
  const number = blocknumber
    ? blocknumber.blocknumber
    : undefined
  return {
    loading,
    participants,
    blockNumber: number,
    userId
  }
}, App)

export default AppContainer
