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
});
