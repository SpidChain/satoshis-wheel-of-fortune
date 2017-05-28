import React from 'react'
import {Col, Row} from 'reactstrap'

const Participants = ({participants, loading}) => {
  return (
    <Row>
      <Col md='12'>
        {loading
          ? <p> loading... </p>
          : <ol start='0'> {participants.map(e => <li key={e._id}> {e.name} </li>)} </ol>
        }
      </Col>
    </Row>
  )
}

export default Participants
