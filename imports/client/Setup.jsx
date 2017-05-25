import React from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'

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
  ? <Login />
  : <Form onSubmit={submitHandler}>
    <FormGroup>
      <Input type='number' name='blocknumber' placeholder='blocknumber' />
    </FormGroup>
    <FormGroup>
      <Input type='textarea' name='participants' rows='10' cols='30' />
    </FormGroup>
    <Button type='submit' color='primary' block> Submit </Button>
  </Form>

export default Setup
