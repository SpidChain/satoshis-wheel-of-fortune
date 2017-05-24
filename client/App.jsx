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
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Spidchain</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/participants">Participants</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/setup">Setup</Link></li>
            </ul>
          </div>
          </nav>
          <Route exact={true} path="/" component={Main}/>
          <Route path="/setup" component={Setup}/>
          <Route path="/participants" component={ParticipantsContainer}/>
        </div>
      </BrowserRouter>,
      document.getElementById('app'))
  //initWheel()
      })
