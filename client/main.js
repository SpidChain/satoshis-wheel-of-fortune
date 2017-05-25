import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from '/imports/client/AppContainer'

Meteor.startup(() => {
  ReactDOM.render(<AppContainer/>, document.getElementById('app'))
})
