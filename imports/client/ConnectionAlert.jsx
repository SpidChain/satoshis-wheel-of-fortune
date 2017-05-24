import React from 'react'
import {Alert} from 'reactstrap'

const Link = () => <a href='https://blockchain.info/'>blockchain.info</a>

const ConnectionAlert = ({active}) => active
  ? <Alert color='success'>
    Connessione a <Link /> <strong>attiva</strong>
  </Alert>
  : <Alert color='danger'>
    Connessione a <Link /> <strong>non attiva</strong>
  </Alert>

export default ConnectionAlert
