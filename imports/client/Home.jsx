import React from 'react'
import {Col, Row} from 'reactstrap'

import ConnectionAlert from './ConnectionAlert'
import ResultForm from './ResultForm'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const Home = ({
  blockNumber,
  connectionActive,
  loading,
  nonce,
  onStop,
  participants,
  showResult,
  spinning
}) => {
  const names = participants.map((e) => e.name)
  if (loading) {
    return <p> loading </p>
  }
  return <div>
    <Row>
      <Col md='12'>
        <Winner winner={showResult && names[nonce % names.length]} />
      </Col>
    </Row>
    <Row>
      <Col md='9'>
        <WheelCanvas emails={names} nonce={nonce} spinning={spinning} onStop={onStop} />
      </Col>
      <Col md='3'>
        <ResultForm blockNumber={blockNumber} nonce={showResult && nonce} partecipants={names.length} />
        <br />
        <ConnectionAlert active={connectionActive} />
      </Col>
    </Row>
  </div>
}

export default Home
