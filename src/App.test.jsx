// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import App from './App';
// import { SettingsProvider } from './Context/Settings';

// describe('Testing the App component', () => {
//   test('Should display ToDo item when form is submitted', () => {
//     render(
//       <SettingsProvider>
//         <App />
//       </SettingsProvider>
//     );

//     let inputTodo = screen.getByTestId('todo-input');
//     let inputAssign = screen.getByTestI('assign-input');
//     let submitButton = screen.getByTestId('submit-button');
//     fireEvent.change(inputTodo, { target: { value: 'Cook food' } });
//     fireEvent.change(inputAssign, { target: { value: 'Koko' } });
//     fireEvent.click(submitButton);
//     expect(screen.getByText('Cook food')).toBeInTheDocument();
//     expect(screen.getByText('Koko')).toBeInTheDocument();
//     expect(screen.getByText('Toggle Complete')).toBeInTheDocument();
//   });
// });

// import { render, screen, describe } from '@testing-library/react';
// import App from './App';

// test('renders the App component', () => {
//   render(<App />);

//   const documentTitle = screen.getByText(/To Do List:/i);
//   expect(documentTitle).toBeInTheDocument();
// });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
    };
  };

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  test('renders the App component', () => {
    render(<App />);
    const documentTitle = screen.getByText(/To Do List:/i);
    expect(documentTitle).toBeInTheDocument();
  });

  test('Should display ToDo item when form is submitted', () => {
    render(<App />);

    let inputTodo = screen.getByTestId('todo-input');
    let inputAssign = screen.getByTestId('assign-input');
    let submitButton = screen.getByTestId('submit-button');
    fireEvent.change(inputTodo, { target: { value: 'Cook food' } });
    fireEvent.change(inputAssign, { target: { value: 'Koko' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Cook food')).toBeInTheDocument();
    expect(screen.getByText('Koko')).toBeInTheDocument();
    expect(screen.getByText('Toggle Complete')).toBeInTheDocument();
  });
});
