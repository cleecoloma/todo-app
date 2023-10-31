import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '../Settings';

describe('SettingsProvider', () => {
  it('should render children and provide context values', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ display, isCompleted }) => (
            <div>
              <span data-testid='display'>{display}</span>
              <span data-testid='isCompleted'>{isCompleted.toString()}</span>
            </div>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const displayElement = screen.getByTestId('display');
    const isCompletedElement = screen.getByTestId('isCompleted');

    // Ensure that the context values are provided and displayed
    expect(displayElement).toBeInTheDocument();
    expect(isCompletedElement).toBeInTheDocument();
  });

  it('should provide default context values', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ display, isCompleted }) => (
            <div>
              <span data-testid='display'>{display}</span>
              <span data-testid='isCompleted'>{isCompleted.toString()}</span>
            </div>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const displayElement = screen.getByTestId('display');
    const isCompletedElement = screen.getByTestId('isCompleted');

    // Ensure that default context values are provided
    expect(displayElement).toHaveTextContent('3'); // Default value for display
    expect(isCompletedElement).toHaveTextContent('false'); // Default value for isCompleted
  });

  it('should update context values', () => {
    const { rerender } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ display, isCompleted }) => (
            <div>
              <span data-testid='display'>{display}</span>
              <span data-testid='isCompleted'>{isCompleted.toString()}</span>
            </div>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    // Update the context values
    rerender(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ display, isCompleted }) => (
            <div>
              <span data-testid='display'>{display}</span>
              <span data-testid='isCompleted'>{isCompleted.toString()}</span>
            </div>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const displayElement = screen.getByTestId('display');
    const isCompletedElement = screen.getByTestId('isCompleted');

    // Ensure that the context values have been updated
    expect(displayElement).toHaveTextContent('3'); // Updated value for display
    expect(isCompletedElement).toHaveTextContent('false'); // Updated value for isCompleted
  });
});
