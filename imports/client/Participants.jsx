import React from 'react'
import ReactDOM from 'react-dom'
import {Col, Container, Row} from 'reactstrap'

const Participants = ({participants, loading}) => {
    return (
      <Container fluid>
        <Row>
          <Col md='12'>
            {loading ?
                <p> loading... </p>
                : <ul> {participants.map( e => <li> {e.name} </li>)} </ul>
            }
          </Col>
        </Row>
      </Container>
    )
  }


export default Participants
