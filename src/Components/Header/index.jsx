import React from 'react';
import './Header.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className='custom-navbar' expand='lg'>
      <div
        className='mx-auto d-flex justify-content-between align-items-center'
        style={{ width: '40%' }}
      >
        <Nav>
          <Nav.Item>
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
      </div>
    </Navbar>
  );
}

export default Header;
