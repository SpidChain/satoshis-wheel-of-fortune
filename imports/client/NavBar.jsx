import React from 'react'
import createReactClass from 'create-react-class'
import {Collapse, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {Link} from 'react-router-dom'

const NavBar = createReactClass({
  displayName: 'NavBar',

  getInitialState: () => ({
    isOpen: false
  }),

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  },

  render () {
    return <Navbar toggleable='md' light color='faded'>
      <NavbarToggler onClick={this.toggle} right data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation' />
      <NavbarBrand>Spidchain</NavbarBrand>
      <Collapse navbar isOpen={this.state.isOpen} id='navbarSupportedContent'>
        <Nav navbar className='mr-auto'>
          <NavItem className='active'><Link className='nav-link' to='/'>Home</Link></NavItem>
          <NavItem><Link className='nav-link' to='/participants'>Participants</Link></NavItem>
          <NavItem><Link className='nav-link' to='/setup'>Setup</Link></NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  }
})

export default NavBar
