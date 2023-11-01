import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [display, setDisplay] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);

    const updateDisplay = (newDisplay) => {
      if (newDisplay >= 1 && newDisplay <= 5) {
        setDisplay(newDisplay);
      }
    };

    const toggleIsCompleted = () => {
      setIsCompleted(!isCompleted);
    };


  return (
    <SettingsContext.Provider
      value={{ display, isCompleted, updateDisplay, toggleIsCompleted }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
