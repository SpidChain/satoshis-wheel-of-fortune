import React from 'react'
import {Col, Row} from 'reactstrap'

const Participants = ({participants, loading}) => {
  return (
    <Row>
      <Col md='12'>
        {loading
          ? <p> loading... </p>
          : <ol> {participants.map(e => <li key={e._id}> {e.name} </li>)} </ol>
        }
      </Col>
    </Row>
  )
}

export default Participants
