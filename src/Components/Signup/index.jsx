import React, { useContext, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { When } from 'react-if';
import { Modal, Button, Input, Select } from '@mantine/core';
import { AuthContext } from '../../Context/Auth';
import './Signup.scss';
import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

function Signup() {
  const [opened, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const auth = useContext(AuthContext);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'role') {
      setRole(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        method: 'post',
        url: `${SERVER_URL}/signup`,
        data: {
          username: username,
          password: password,
          role: role.toLowerCase(),
        },
      };

      let response = await axios(config);
      // token comes back in the response
      if (response.data) {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e.message);
      console.error(e);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title='Authentication'>
        {
          <form id='signup-form' onSubmit={handleSubmit}>
            <p>Username</p>
            <Input
              className='input'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
            <p>Password</p>
            <Input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            <p>Role</p>
            <Select
              name='role'
              placeholder='Pick a role'
              value={role}
              onChange={setRole}
              data={['User', 'Writer', 'Editor', 'Admin' ]}
              clearable
              mb='md'
            />
            <Button type='submit'>Login</Button>
          </form>
        }
      </Modal>
      <When condition={!auth.loggedIn}>
        <Button className='signup-button' onClick={open} color='orange'>
          Sign Up
        </Button>
      </When>
    </>
  );
}

export default Signup;
