import React from 'react';
import SettingsProvider from './Context/Settings';
import Header from './Components/Header';
import Todo from './Components/Todo';

function App() {
  return (
    <>
      <SettingsProvider>
        <Header />
        <Todo />
      </SettingsProvider>
    </>
  );
}

export default App;

