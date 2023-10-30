import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [display, setDisplay] = useState(3);
  const [isCompleted, setIsCompleted] = useState(true);

  return (
    <SettingsContext.Provider value={{ display, isCompleted }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
