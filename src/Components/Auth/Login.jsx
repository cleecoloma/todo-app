import React, { useContext, useState } from 'react';
import { When } from 'react-if';
import { AuthContext } from '../../Context/Auth';
import { Button, Input } from '@mantine/core';
import './Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useContext(AuthContext);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(username, password);
  };

  return (
    <>
      <When condition={auth.loggedIn}>
        <Button onClick={auth.logout} color='gray'>
          Log Out
        </Button>
      </When>

      <When condition={!auth.loggedIn}>
        <form id='login-form' onSubmit={handleSubmit}>
          <Input
            className='input'
            placeholder='Username'
            name='username'
            onChange={handleChange}
          />
          <Input
            className='input'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <Button type='submit'>Login</Button>
        </form>
      </When>
    </>
  );
}

export default Login;
