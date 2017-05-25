import React from 'react'
import {BrowserRouter, Route, browserHistory} from 'react-router-dom'

import NavBar from '/imports/client/NavBar'
import Main from '/imports/client/Main'
import Setup from '/imports/client/Setup'
import Participants from '/imports/client/Participants'

const App = ({loading, participants, blockNumber, userId}) => {
  return (<BrowserRouter history={browserHistory}>
    <div>
      <NavBar userId={userId} />
      <Route exact path='/' component={props => <Main
        loading={loading}
        participants={participants}
        blockNumber={blockNumber}
        userId={userId} />} />

      <Route exact path='/setup' component={(props) => <Setup userId={userId} />} />

      <Route exact path='/participants' component={(props) =>
        <Participants {...props}
          participants={participants}
          loading={loading} />} />
    </div>
  </BrowserRouter>
  )
}

export default App
