import React from 'react';
import SettingsProvider from './Context/Settings';
import Header from '../src/Components/Header';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from '../src/Components/Settings';
import Todo from './Components/Todo';
import '@mantine/core/styles.css';
import AuthProvider from './Context/Auth';

function App() {
  return (
    <>
      <MantineProvider>
        <SettingsProvider>
          <AuthProvider>
            <Router>
              <Header />
              <Routes>
                <Route exact path='/' element={<Todo />}></Route>
                <Route exact path='/Settings' element={<Settings />}></Route>
              </Routes>
            </Router>
          </AuthProvider>
        </SettingsProvider>
      </MantineProvider>
    </>
  );
}

export default App;
