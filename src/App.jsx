import React, { useContext } from 'react';
import SettingsProvider from './Context/Settings';
import Header from '../src/Components/Header';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from '../src/Components/Settings';
import Todo from './Components/Todo';
import '@mantine/core/styles.css';
import AuthProvider from './Context/Auth';
import Footer from './Components/Footer';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <>
      <MantineProvider>
        <SettingsProvider>
          <AuthProvider>
            <Router>
              <Header />
              <Routes>
                <Route
                  exact
                  path='/'
                  element={
                    <>
                      <Auth capability={["create", "read"]}>
                        <Todo />
                      </Auth>
                    </>
                  }
                ></Route>
                <Route exact path='/Settings' element={<Settings />}></Route>
              </Routes>
              <Footer />
            </Router>
          </AuthProvider>
        </SettingsProvider>
      </MantineProvider>
    </>
  );
}

export default App;
