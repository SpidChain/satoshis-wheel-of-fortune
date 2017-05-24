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
                : <ol> {participants.map( e => <li> {e.name} </li>)} </ol>
            }
          </Col>
        </Row>
      </Container>
    )
  }


export default Participants
