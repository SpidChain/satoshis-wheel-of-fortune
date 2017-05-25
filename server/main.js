import { Accounts } from 'meteor/accounts-base'

const createAdmin = () => {
  if(! Meteor.users || Meteor.users.find().count() === 0) {
    Accounts.createUser({username: 'spidchain', password: 'xxxyyyzzz'})
  }
}

Meteor.startup(() => {
  createAdmin()
})
