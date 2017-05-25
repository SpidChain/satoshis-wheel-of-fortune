import React from 'react'
import createReactClass from 'create-react-class'
import {Col, Container, Row} from 'reactstrap'

import ConnectionAlert from './ConnectionAlert'
import ResultForm from './ResultForm'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const wsUrl = 'wss://ws.blockchain.info/inv'
const blockUrl = 'https://api-r.bitcoinchain.com/v1/block/'

const Main = createReactClass({
  displayName: 'Main',

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
            nonce: block.nonce
          })
        }
      }
    })
  },

  componentWillMount () {
    this.startConnection()
    this.getNonce(this.props.blockNumber)
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.blockNumber !== nextProps.blockNumber) {
      this.getNonce(nextProps.blockNumber)
    }
  },

  componentWillUnmount () {
    clearInterval(this.state.pinger)
  },

  getNonce (blockNumber) {
    console.log('Block number:', blockNumber)

    if (!Number.isInteger(blockNumber)) {
      return
    }

    this.setState({
      fetching: true
    })
    window.fetch(blockUrl + blockNumber)
      .then((response) => response.json())
      .then((blocks) => {
        if (this.state.fetching) {
          const nonce = blocks[0].nonce
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

  stopSpin () {
    this.setState({
      showResult: true
    })
  },

  render () {
    const names = this.props.participants.map((e) => e.name)
    console.log('participants', this.props.participants)
    if (this.props.loading) {
      return <p> loading </p>
    }
    return <Container fluid>
      <Row>
        <Col md='12'>
          <Winner winner={this.state.showResult && names[this.state.nonce % names.length]} />
        </Col>
      </Row>
      <Row>
        <Col md='9'>
          <WheelCanvas emails={names} nonce={this.state.nonce} spinning={this.state.spinning} onStop={this.stopSpin} />
        </Col>
        <Col md='3'>
          <ResultForm blockNumber={this.props.blockNumber} nonce={this.state.showResult && this.state.nonce} partecipants={names.length} />
          <br />
          <ConnectionAlert active={this.state.connectionActive} />
        </Col>
      </Row>
    </Container>
  }
})

export default Main
