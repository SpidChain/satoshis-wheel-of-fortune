import React from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import {Meteor} from 'meteor/meteor'

const submitHandler = e => {
  e.preventDefault()
  const username = e.target.username.value
  const password = e.target.password.value
  Meteor.loginWithPassword(username, password, function (err) {
    if (err) {
      return console.log(err.reason)
    }
  })
}

const Login = () => {
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Input type='text' name='username' placeholder='username' />
      </FormGroup>
      <FormGroup>
        <Input type='password' name='password' placeholder='password' />
      </FormGroup>
      <Button type='submit' color='primary' block> Submit </Button>
    </Form>
  )
}

export default Login
