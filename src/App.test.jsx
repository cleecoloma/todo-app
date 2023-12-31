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
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  test('renders the App component', () => {
    render(<App />);
    const documentTitle = screen.getByText(/Home/i);
    expect(documentTitle).toBeInTheDocument();
  });
});
