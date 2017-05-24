import React from 'react'
import ReactDOM from 'react-dom'
import Tether from 'tether'
// Export Bootstrap
window.Tether = Tether
require('bootstrap')

//import '/imports/client/styles/'
import Main from '/imports/client/Main'
import {initWheel} from '/imports/client/wheel'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Main />, document.getElementById('app'))
  initWheel()
})

