import React from 'react'
import createReactClass from 'create-react-class'
import {Collapse, Button, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {NavLink} from 'react-router-dom'

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

  logout: () => {
    Meteor.logout()
  },

  render () {
    console.log(this.props.userId)
    const LogoutButton =this.props.userId
      ? <Button onClick={this.logout}>Logout</Button>
      : <div></div>
    return <Navbar toggleable='xs' light color='faded'>
      <NavbarToggler onClick={this.toggle} right data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation' />
      <NavbarBrand>Spidchain</NavbarBrand>
      <Collapse navbar isOpen={this.state.isOpen} id='navbarSupportedContent'>
        <Nav navbar className='mr-auto'>
          <NavItem>
            <NavLink className='nav-link' to='/' exact activeClassName='active'>
                Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-link' to='/participants' exact activeClassName='active'>
                Participants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-link' to='/setup' exact activeClassName='active'>
                Setup
            </NavLink>
          </NavItem>
          {LogoutButton}
        </Nav>
      </Collapse>
    </Navbar>
  }
})

export default NavBar
