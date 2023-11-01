import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';
import Footer from '../Footer';
import { Switch, NumberInput, Card, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import './Settings.scss';

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
      <Card
        className='card-container' // Add the class for styling
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <h2>Update Settings</h2>
        <div className='toggle-todo'>
          <p>Show/Hide Completed ToDos:</p>
          <Switch checked={isCompleted} onChange={handleToggleIsCompleted} />
        </div>
        <div className='toggle-display'>
          <p>Update # Of Displayed Items:</p>
          <NumberInput
            defaultValue={display}
            min={1}
            max={5}
            onChange={handleDisplayChange}
          />
        </div>

        <Button
          className='settings-button'
          component={Link}
          to='/'
        >
          Show Updated Todo
        </Button>
      </Card>
      <Card
        className='card-container' // Add the class for styling
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <h2>Updated Settings</h2>
        <p>Completed ToDos: {isCompleted ? ' Show' : ' Hide'}</p>
        <p>Items to Display Page: {display}</p>
      </Card>
      <Footer />
    </>
  );
}

export default Settings;
