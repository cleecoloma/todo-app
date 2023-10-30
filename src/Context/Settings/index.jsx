import React, { useState } from 'react';

// This is the object that will track values
export const SettingsContext = React.createContext();

// this is the Provider that must be present at the root of our app.
function SettingsProvider(props) {
  const [display, setDisplay] = useState(3);
  const [isCompleted, setIsCompleted] = useState(true);

  return (
    // the value prop must be called value
    <SettingsContext.Provider value={{ display, completed }}>
      {/* this is not banana */}
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
