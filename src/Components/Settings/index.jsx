import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';
import Footer from '../Footer';
import { Switch, NumberInput } from '@mantine/core';

function Settings() {
  const { display, isCompleted, updateDisplay, toggleIsCompleted } =
    useContext(SettingsContext);

  const handleDisplayChange = (value) => {
    updateDisplay(value);
  };

  const handleToggleIsCompleted = () => {
    toggleIsCompleted();
  };

  return (
    <>
      <div>
        <p>Display: {display}</p>
        <p>Is Completed: {isCompleted ? 'Yes' : 'No'}</p>
        <button onClick={handleDisplayChange}>Change Display</button>
        <button onClick={handleToggleIsCompleted}>Toggle Is Completed</button>
        <Switch checked={isCompleted} onChange={handleToggleIsCompleted} />
        <NumberInput
          defaultValue={display}
          min={1}
          max={5}
          onChange={handleDisplayChange}
        />
      </div>
      <Footer />
    </>
  );
}

export default Settings;
