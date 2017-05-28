import React from 'react'
import createReactClass from 'create-react-class'
import {Meteor} from 'meteor/meteor'
import {BrowserRouter, Route, browserHistory} from 'react-router-dom'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import {Container} from 'reactstrap'

import NavBar from '/imports/client/NavBar'
import Home from '/imports/client/Home'
import Setup from '/imports/client/Setup'
import Participants from '/imports/client/Participants'

const wsUrl = 'wss://ws.blockchain.info/inv'

const App = createReactClass({
  displayName: 'App',

  getInitialState: () => ({
    connectionActive: false,
    fetching: false,
    nonce: undefined,
    pinger: undefined,
    showResult: false,
    socket: undefined,
    spinning: false
  }),

  startConnection () {
    const socket = new window.WebSocket(wsUrl)
    const that = this

    this.setState({
      socket: socket
    })

    socket.addEventListener('open', (event) => {
      socket.send('{"op":"blocks_sub"}')

      // Ping the server every 30 seconds to keeps the connection alive
      const pinger = setInterval(() => {
        console.log('Pinging...')
        socket.send('{"op":"ping"}')
      }, 30000)

      that.setState({
        connectionActive: true,
        pinger: pinger
      })
    })

    socket.addEventListener('close', (event) => {
      clearInterval(this.state.pinger)
      that.setState({
        connectionActive: false,
        pinger: undefined,
        socket: undefined
      })
    })

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      const height = this.props.blockNumber
      if (data.op === 'block') {
        const block = data.x
        console.log('New block:', block)
        if (block.height === height && this.state.fetching) {
          console.log('Nonce:', block.nonce)
          that.setState({
            fetching: false,
            nonce: block.nonce,
            spinning: true
          })
        }
      }
    })
  },

  componentDidMount () {
    this.startConnection()
    this.getNonce(this.props.blockNumber)
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.blockNumber !== nextProps.blockNumber) {
      this.getNonce(nextProps.blockNumber)
    }
  },

  componentWillUnmount () {
    console.log('Unmounting...')
    clearInterval(this.state.pinger)
  },

  getNonce (blockNumber) {
    this.setState({
      fetching: true
    })

    Meteor.call('getNonce', (err, nonce) => {
      if (err) {
        console.log('Waiting for block:', blockNumber)
        return
      }

      if (this.state.fetching) {
        this.setState({
          fetching: false,
          nonce: nonce,
          showResult: true
        })
        console.log('Nonce:', nonce)
      }
    })
  },

  stopSpin () {
    console.log('Stop spinning.')
    this.setState({
      showResult: true,
      spinning: false
    })
  },

  render () {
    return <BrowserRouter history={browserHistory}>
      <div>
        <GitHubForkRibbon
          href='https://github.com/SpidChain/satoshis-wheel-of-fortune'
          target='_blank'
          position='right'>
          Fork me on GitHub
        </GitHubForkRibbon>

        <NavBar userId={this.props.userId} />

        <Container fluid>
          <Route exact path='/' component={() => <Home
            {...this.state}
            loading={this.props.loading}
            participants={this.props.participants}
            blockNumber={this.props.blockNumber}
            onStop={this.stopSpin}
              />} />

          <Route exact path='/setup' component={(props) => <Setup userId={this.props.userId} />} />

          <Route exact path='/participants' component={(props) =>
            <Participants {...props}
              participants={this.props.participants}
              loading={this.props.loading} />} />
        </Container>
      </div>
    </BrowserRouter>
  }
})

export default App
