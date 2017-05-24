import React from 'react'
import ReactDOM from 'react-dom'


const Participants = ({participants, loading}) => {
  if(loading) {
    return (<p> loading... </p>)
  }
  return (
        <ul>
          {participants.map( e => <li> {e.name} </li>)}
        </ul>
  )
}

export default Participants
