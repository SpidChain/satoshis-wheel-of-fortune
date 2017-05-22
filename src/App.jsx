import React from 'react'
import ReactDOM from 'react-dom'


import './styles'
import Main from './Main'
import {initWheel} from './wheel'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Main />, document.getElementById('app'))
  initWheel()
})

