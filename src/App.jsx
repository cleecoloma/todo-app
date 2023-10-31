import React from 'react';
import SettingsProvider from './Context/Settings';
import { MantineProvider } from '@mantine/core';
import Todo from './Components/Todo';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider>
        <SettingsProvider>
          <Todo />
        </SettingsProvider>
      </MantineProvider>
    </>
  );
}

export default App;
