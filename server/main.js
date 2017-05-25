import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'

const createAdmin = () => {
  const username = Meteor.settings.username
  const password = Meteor.settings.password
  if (!Meteor.users || Meteor.users.find().count() === 0) {
    Accounts.createUser({username, password})
  }
}

Meteor.startup(() => {
  createAdmin()
})
