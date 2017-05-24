import React from 'react'

const submitHandler = e => {
  e.preventDefault()
  const blocknumber = e.target.blocknumber.value
  const participants = e.target.participants.value
  if (blocknumber !== '') {
    Meteor.call('setBlocknumber', blocknumber)
  }
  if (participants !== '') {
    Meteor.call('addParticipants', participants)
  }
  e.target.reset()
}

const Form = ({setCounter}) => {
  return (
    <form onSubmit={submitHandler}>
      <input type='number' name='blocknumber' placeholder='blocknumber' className='form-control'/>
      <textarea name='participants' rows='10' cols='30' className='form-control' >
      </textarea>
      <button type='submit' className='btn btn-primary form-control'> Submit </button>
    </form>
  )
}

export default Form
