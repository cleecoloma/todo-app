import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AuthProvider, { AuthContext } from '../Auth';

describe('AuthContext and AuthProvider Tests', () => {
  let jwtDecodeOriginal;
  let cookieLoadOriginal;
  let cookieSaveOriginal;

  beforeEach(() => {
    // Backup the original functions
    jwtDecodeOriginal = require('jwt-decode');
    cookieLoadOriginal = require('react-cookies').load;
    cookieSaveOriginal = require('react-cookies').save;

    // Replace the original functions with custom implementations
    require('jwt-decode').decode = () => ({
      name: 'Administrator',
      capabilities: ['create', 'read', 'update', 'delete'],
    });
    require('react-cookies').load = () => null;
    require('react-cookies').save = () => {};
  });

  afterEach(() => {
    // Restore the original functions after each test
    require('jwt-decode').decode = jwtDecodeOriginal;
    require('react-cookies').load = cookieLoadOriginal;
    require('react-cookies').save = cookieSaveOriginal;
  });

  it('should render AuthProvider with the default state', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => (
            <>
              <div>{context.loggedIn ? 'Logged In' : 'Logged Out'}</div>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(getByText('Logged Out')).toBeInTheDocument();
  });

  it('should log in a user', async () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => (
            <>
              <div>{context.loggedIn ? 'Logged In' : 'Logged Out'}</div>
              <div>{context.user.name}</div>
              <button onClick={() => context.login('Administrator', 'admin')}>
                Login
              </button>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const loginButton = getByText('Login');

    fireEvent.click(loginButton);
    await screen.findByText('Logged In');
    expect(getByText('Administrator')).toBeInTheDocument();
  });

  it('should log out a user', async () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => (
            <>
              <div>{context.loggedIn ? 'Logged In' : 'Logged Out'}</div>
              <div>{context.user.name}</div>
              <button onClick={() => context.login('Administrator', 'admin')}>
                Login
              </button>
              <button onClick={() => context.logout()}>Logout</button>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const loginButton = getByText('Login');
    const logoutButton = getByText('Logout');

    fireEvent.click(loginButton);
    await screen.findByText('Logged In');

    fireEvent.click(logoutButton);
    await screen.findByText('Logged Out');
  });
});
