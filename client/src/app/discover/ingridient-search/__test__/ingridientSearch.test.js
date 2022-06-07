import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import IngridientSearch from '../ingridient-search';
import { server } from '../../../../mocks/server';

let history;
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
  history = createBrowserHistory();
});

afterAll(() => {
  server.close();
});

function MockIngridientSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <IngridientSearch />
    </Router>
  );
}

describe('Ingridients search tests', () => {
  test('should be able to type in input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'banana' } });
    expect(inputEllement.value).toBe('banana');
  });

  test('should show spinner when changing input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'banana' } });
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('should not show spinner when ingridients are fetched', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'apple' } });
    const spinnerElement = screen.getByTestId('spinner');
    await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
    expect(spinnerElement).not.toBeInTheDocument();
  });

  test('should fetch and render ingridients when value is typed in the input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'a' } });
    await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
    expect(screen.getByTestId('ingridient-testid-0')).toBeInTheDocument();
  });
});
