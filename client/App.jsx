import React from 'react'
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor'
import {BrowserRouter, Route, browserHistory, Link} from 'react-router-dom'

import Main from '/imports/client/Main'
import Setup from '/imports/client/Setup'
import ParticipantsContainer from '/imports/client/ParticipantsContainer'
import {initWheel} from '/imports/client/wheel'

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <div>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/participants">Participants</Link></li>
        <li><Link to="/setup">Setup</Link></li>
        <Route exact='true' path="/" component={Main}/>
        <Route path="/setup" component={Setup}/>
        <Route path="/participants" component={ParticipantsContainer}/>
      </div>
    </BrowserRouter>,
    document.getElementById('app'))
  initWheel()
})
