import React, { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const initialUserPreferences = JSON.parse(
    localStorage.getItem('userPreferences')
  );
  const [display, setDisplay] = useState(
    initialUserPreferences ? initialUserPreferences.display : 3
  );
  const [isCompleted, setIsCompleted] = useState(
    initialUserPreferences ? initialUserPreferences.isCompleted : false
  );

  const updateDisplay = (newDisplay) => {
    if (newDisplay >= 1 && newDisplay <= 5) {
      setDisplay(newDisplay);
    }
  };

  const toggleIsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  // Save user preferences to local storage
  const saveUserPreferencesToLocalStorage = () => {
    const userPreferences = { display, isCompleted };
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  };

  // Read from local storage and set the state properties on load
  useEffect(() => {
    const userPreferences = localStorage.getItem('userPreferences');
    if (userPreferences) {
      const parsedPreferences = JSON.parse(userPreferences);
      setDisplay(parsedPreferences.display);
      setIsCompleted(parsedPreferences.isCompleted);
    }
  }, []);

  useEffect(() => {
    saveUserPreferencesToLocalStorage();
  }, [display, isCompleted]);

  return (
    <SettingsContext.Provider
      value={{ display, isCompleted, updateDisplay, toggleIsCompleted }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
