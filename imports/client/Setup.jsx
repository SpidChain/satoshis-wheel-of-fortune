import React from 'react'

const submitHandler = setCounter => e => {
  e.preventDefault()
  const value = e.target.participants.value
  console.log(value)
  if (value !== '') {
    Meteor.call('addParticipants', value)
    e.target.reset()
  }
}

const Form = ({setCounter}) => {
  return (
    <form onSubmit={submitHandler(setCounter)}>
      <textarea name='participants' placeholder='participants' rows='10' cols='30' className='form-control' > </textarea>
      <button type='submit' className='btn btn-primary form-control'> Submit </button>
    </form>
  )
}

export default Form
