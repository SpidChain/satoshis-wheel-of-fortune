import React from 'react'
import ReactDOM from 'react-dom'
import {Collapse, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {Meteor} from 'meteor/meteor'
import {BrowserRouter, Route, browserHistory, Link} from 'react-router-dom'

import MainContainer from '/imports/client/MainContainer'
import Setup from '/imports/client/Setup'
import ParticipantsContainer from '/imports/client/ParticipantsContainer'

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <div>
        <Navbar toggleable='md' light color='faded'>
          <NavbarToggler right data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation' />
          <NavbarBrand>Spidchain</NavbarBrand>
          <Collapse navbar id='navbarSupportedContent'>
            <Nav navbar className='mr-auto'>
              <NavItem className='active'><Link className='nav-link' to='/'>Home</Link></NavItem>
              <NavItem><Link className='nav-link' to='/participants'>Participants</Link></NavItem>
              <NavItem><Link className='nav-link' to='/setup'>Setup</Link></NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Route exact path='/' component={MainContainer} />
        <Route path='/setup' component={Setup} />
        <Route path='/participants' component={ParticipantsContainer} />
      </div>
    </BrowserRouter>,
      document.getElementById('app'))
})
