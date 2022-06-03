/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
// import useApi from '../../../../not_working__mocks__/useApi';
import IngridientSearch from '../ingridient-search';
import { server } from '../../../../mocks/server';

let history;
beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
  history = createBrowserHistory();
  // jest.spyOn(window, 'fetch').mockImplementation(useApi);
});

afterAll(() => server.close());

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

    await waitFor(() => {
      screen.getByTestId('ingridient-testid-0');
    });
    expect(spinnerElement).not.toBeInTheDocument();
  });

  test('should fetch ingridients when value is typed in the input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'apple' } });
    await waitFor(() => {
      screen.getByTestId('ingridient-testid-0');
    });
    expect(screen.getByTestId('ingridient-testid-0')).toBeInTheDocument();
  });
  // test('should not show spinner when ingridients are fetched', async () => {
  //   render(
  //     <MockIngridientSearch />,
  //   );
  //   const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
  //   fireEvent.change(inputEllement, { target: { value: 'apple' } });
  //   const spinnerElement = screen.getByTestId('spinner');

  //   waitFor(async () => {
  //     const ingridientCard = await screen.findByTestId('ingridient-testid-5');
  //     screen.debug();
  //     expect(ingridientCard).toBeInTheDocument();
  //     expect(spinnerElement).not.toBeInTheDocument();
  //   });
  // });
});
// test('should render one card', async () => {
//   render(
//     <MockIngridientSearch />,
//   );
//   const divEllement = await screen.findByTestId('ingridient-testid-0');
//   expect(divEllement).toBeInTheDocument();
// });
