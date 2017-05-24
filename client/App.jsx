import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, hashHistory } from 'react-router-dom'

import Tether from 'tether'
// Export Bootstrap
window.Tether = Tether
require('bootstrap')

//import '/imports/client/styles/'
import Main from '/imports/client/Main'
import {initWheel} from '/imports/client/wheel'


Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={hashHistory}>
      <Route path="/" component={Main}/>
    </BrowserRouter>,
    document.getElementById('app'))
  initWheel()
})

