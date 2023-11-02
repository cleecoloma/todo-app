import React, { useContext, useState } from 'react';
import { When } from 'react-if';
import { AuthContext } from '../../Context/Auth';

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
        <button onClick={auth.logout}>Log Out</button>
      </When>

      <When condition={!auth.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Username'
            name='username'
            onChange={handleChange}
          />
          <input
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </When>
    </>
  );
}

export default Login;
