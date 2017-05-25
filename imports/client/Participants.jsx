import React from 'react'
import {Col, Container, Row} from 'reactstrap'

const Participants = ({participants, loading}) => {
  console.log('participants', participants, loading)
  return (
    <Container fluid>
      <Row>
        <Col md='12'>
          {loading
            ? <p> loading... </p>
            : <ol> {participants.map(e => <li key={e._id}> {e.name} </li>)} </ol>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Participants
