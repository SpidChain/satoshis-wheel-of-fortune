import React from 'react'
import createReactClass from 'create-react-class'
import {Col, Container, Row} from 'reactstrap'

import emails from './emails'
import BlockNumberForm from './BlockNumberForm'
import ConnectionAlert from './ConnectionAlert'
import ResultForm from './ResultForm'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const wsUrl = 'wss://ws.blockchain.info/inv'
const blockHashUrl = 'https://blockexplorer.com/api/block-index/'
const blockUrl = 'https://blockexplorer.com/api/block/'

const Main = createReactClass({
  displayName: 'Main',

  getInitialState: () => ({
    blockNumber: undefined,
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
      const height = that.state.blockNumber
      if (data.op === 'block') {
        const block = data.x
        console.log('New block:', block)
        if (block.height === height && this.state.fetching) {
          console.log('Nonce:', block.nonce)
          that.setState({
            fetching: false,
            nonce: block.nonce
          })
        }
      }
    })
  },

  componentWillMount () {
    this.startConnection()
  },

  componentWillUnmount () {
    clearInterval(this.state.pinger)
  },

  getNonce (blockNumber) {
    this.reset()
    this.setState({
      blockNumber: blockNumber,
      fetching: true
    })
    window.fetch(blockHashUrl + blockNumber)
      .then((response) => response.json())
      .then((obj) => obj.blockHash)
      .then((hash) => window.fetch(blockUrl + hash))
      .then((response) => response.json())
      .then((block) => {
        if (this.state.fetching) {
          const nonce = block.nonce
          this.setState({
            fetching: false,
            nonce: nonce
          })
          console.log('Nonce:', nonce)
        }
      })
      .catch(() => {
        console.log('Waiting for block:', blockNumber)
      })
  },

  reset () {
    this.setState({
      blockNumber: undefined,
      fetching: false,
      nonce: undefined,
      showResult: false
    })
  },

  stopSpin () {
    this.setState({
      showResult: true
//      spinning: false
    })
  },

  render () {
    console.log('participants', this.props.participants)
    if (this.props.loading) {
      return <p> loading </p>
    }
    return <Container fluid>
      <Row>
        <Col md='12'>
          <Winner winner={this.state.showResult && emails[this.state.nonce % emails.length]} />
        </Col>
      </Row>
      <Row>
        <Col md='9'>
          <WheelCanvas emails={this.props.participants} nonce={this.state.nonce} spinning={this.state.spinning} onStop={this.stopSpin} />
        </Col>
        <Col md='3'>
          <BlockNumberForm onBlockNumber={this.getNonce} onReset={this.reset} />
          <br />
          <ResultForm blockNumber={this.props.blocknumber.blocknumber} nonce={this.state.showResult && this.state.nonce} partecipants={emails.length} />
          <br />
          <ConnectionAlert active={this.state.connectionActive} />
        </Col>
      </Row>
    </Container>
  }
})

export default Main
