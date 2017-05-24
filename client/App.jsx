import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, hashHistory} from 'react-router-dom'
import {Meteor} from 'meteor/meteor'

import Main from '/imports/client/Main'
import {initWheel} from '/imports/client/wheel'

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={hashHistory}>
      <Route path='/' component={Main} />
    </BrowserRouter>,
    document.getElementById('app'))
  initWheel()
})
