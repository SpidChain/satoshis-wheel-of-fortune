import React from 'react'

const submitHandler = e => {
  e.preventDefault()
  const username = e.target.username.value
  const password = e.target.password.value
  Meteor.loginWithPassword(username, password, function(err){
    if (err) {
      return    console.log(err.reason)
    }
  })
}

export default Login = () => {
  return (
    <form onSubmit={submitHandler}>
      <input type='text' name='username' placeholder='username' className='form-control' />
      <input type='password' name='password' className='form-control' />
      <button type='submit' className='btn btn-primary form-control'> Submit </button>
    </form>
  )
}
