import React from 'react'
import {Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row} from 'reactstrap'
import {Meteor} from 'meteor/meteor'

import Login from './Login'

const submitHandler = e => {
  e.preventDefault()
  const blocknumber = e.target.blocknumber.value
  const participants = e.target.participants.value
  if (blocknumber !== '') {
    try {
      Meteor.call('setBlocknumber', parseInt(blocknumber))
    } catch (e) {
      console.error(e)
    }
  }
  if (participants !== '') {
    Meteor.call('addParticipants', participants)
  }
  e.target.reset()
}

const Setup = ({userId}) => !userId
  ? <Container fluid><Row><Col xs='12'><Login /></Col></Row></Container>
  : <Container fluid>
    <Row>
      <Col xs='12'>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label>Numero blocco</Label>
            <Input type='number' name='blocknumber' placeholder='blocknumber' />
          </FormGroup>
          <FormGroup>
            <Label>Lista partecipanti</Label>
            <Input type='textarea' name='participants' rows='10' cols='30' />
            <FormText color='muted'>
              Inserire le email dei partecipanti, una per riga.
            </FormText>
          </FormGroup>
          <Button type='submit' color='primary' block> Submit </Button>
        </Form>
      </Col>
    </Row>
  </Container>

export default Setup
