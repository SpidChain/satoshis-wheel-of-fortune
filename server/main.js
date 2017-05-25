import { Accounts } from 'meteor/accounts-base'

const createAdmin = () => {
  username = Meteor.settings.username
  password = Meteor.settings.password
  if(! Meteor.users || Meteor.users.find().count() === 0) {
    Accounts.createUser({username, password})
  }
}

Meteor.startup(() => {
  createAdmin()
})
