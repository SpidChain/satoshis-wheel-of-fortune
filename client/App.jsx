import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, hashHistory} from 'react-router-dom'
import {Meteor} from 'meteor/meteor'

import Main from '/imports/client/Main'
import Setup from '/imports/client/Setup'
import {initWheel} from '/imports/client/wheel'

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={hashHistory}>
      <div>
        <Route path="/" component={Main}/>
        <Route path="/setup" component={Setup}/>
      </div>
    </BrowserRouter>,
    document.getElementById('app'))
  initWheel()
})
