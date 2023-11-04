import React from 'react';
import './Header.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../Auth/Login';
import Signup from '../Signup';

function Header() {
  return (
    <Navbar className='custom-navbar' expand='lg'>
      <Nav className='nav'>
        <Nav.Item className='nav-item'>
          <Link className='nav-link custom-nav-link' to='/'>
            Home
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link custom-nav-link' to='/Settings'>
            Settings
          </Link>
        </Nav.Item>
      </Nav>
      <div className='navbar-buttons'>
        <Login />
        <Signup />
      </div>
    </Navbar>
  );
}

export default Header;
