import React from 'react'
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor'
import {BrowserRouter, Route, browserHistory} from 'react-router-dom'

import NavBar from '/imports/client/NavBar'
import MainContainer from '/imports/client/MainContainer'
import SetupContainer from '/imports/client/SetupContainer'
import ParticipantsContainer from '/imports/client/ParticipantsContainer'

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <div>
        <NavBar />
        <Route exact path='/' component={MainContainer} />
        <Route exact path='/setup' component={SetupContainer} />
        <Route exact path='/participants' component={ParticipantsContainer} />
      </div>
    </BrowserRouter>,
      document.getElementById('app'))
})
