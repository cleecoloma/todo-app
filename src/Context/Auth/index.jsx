import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// const testUsers = {
//   Administrator: {
//     password: 'admin',
//     name: 'Administrator',
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ',
//   },
//   Editor: {
//     password: 'editor',
//     name: 'Editor',
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s',
//   },
//   Writer: {
//     password: 'writer',
//     name: 'Writer',
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68',
//   },
//   User: {
//     password: 'user',
//     name: 'User',
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go',
//   },
// };

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  let [loggedIn, setLoggedIn] = React.useState(false);
  let [user, setUser] = React.useState({ capabilities: [] });
  let [token, setToken] = React.useState(null);
  let [error, setError] = React.useState(null);

  const can = (capabilities) => {
    if (user && user.capabilities && Array.isArray(capabilities)) {
      return capabilities.some((capability) =>
        user.capabilities.includes(capability)
      );
    }
    return false;
  };

  const login = async (username, password) => {
    // basic auth!
    // base64 encode the username and password
    let encodedCredentials = btoa(`${username}:${password}`);

    // attach to the request header
    try {
      const config = {
        method: 'post',
        url: `${SERVER_URL}/signin`,
        headers: { Authorization: `Basic ${encodedCredentials}` },
      };
      let response = await axios(config);
      // token comes back in the response
      if (response.data) {
        console.log(response.data);
        validateToken(response.data.token);
      }
    } catch (e) {
      console.log(e.message);
      setLoginState(loggedIn, token, user, e);
      console.error(e);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const validateToken = (token) => {
    if (!token) {
      // Handle the case where the token is null (initial render)
      setLoginState(false, null, {});
      return;
    }

    try {
      let validUser = jwtDecode(token);
      setLoginState(true, token, validUser);
    } catch (e) {
      console.log('Token Validation Error', e);
      console.log('Invalid Token:', token);
      setLoginState(false, null, {}, e);
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    setToken(token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, can, login, token, logout, user, error }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
