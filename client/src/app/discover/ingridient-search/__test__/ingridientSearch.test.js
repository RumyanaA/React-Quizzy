/* eslint-disable no-unused-expressions */
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

const fetchIngridient = async (clickIngridient = true) => {
  const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
  fireEvent.change(inputEllement, { target: { value: 'a' } });
  const fetchedIngridient = await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
  clickIngridient && fireEvent.click(fetchedIngridient);
  return fetchedIngridient;
};

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
    const spinnerElement = screen.getByTestId('ingridients-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('should not show spinner when ingridients are fetched', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'apple' } });
    const spinnerElement = screen.getByTestId('ingridients-spinner');
    await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
    expect(spinnerElement).not.toBeInTheDocument();
  });

  test('should fetch and render ingridients when value is typed in the input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const fetchedIngridient = await fetchIngridient(false);
    expect(fetchedIngridient).toBeInTheDocument();
  });

  test('should display clicked ingridient in selected ingridients container', async () => {
    render(
      <MockIngridientSearch />,
    );
    const fetchedIngridient = await fetchIngridient();

    const selectedIngridient = screen.getByTestId('selectedIngridient-testid-0');
    expect(selectedIngridient).toHaveTextContent(fetchedIngridient.textContent);
  });

  test('should remove ingridient from selected ingridients when X-button is clicked', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const selectedIngridient = screen.getByTestId('selectedIngridient-testid-0');

    const ingridientRemoveElement = screen.getByTestId('div-X-testid-0');
    fireEvent.click(ingridientRemoveElement);
    expect(selectedIngridient).not.toBeInTheDocument();
  });

  test('should show recipes-spinner while fetching recipes', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const spinnerElement = screen.getByTestId('recipes-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('should fetch and render recipe after "find recipes" button is clicked', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const fetchedRecipes = await waitFor(() => screen.getByTestId('recipe-testId-0'), { timeout: 1100 });
    expect(fetchedRecipes).toBeInTheDocument();
  });

  test('should fetch and render 2 recipes after find recipes button is clicked', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const fetchedRecipes = await waitFor(() => screen.getAllByTestId(/recipe-testId-/i), { timeout: 1100 });
    expect(fetchedRecipes.length).toBe(2);
  });

  test('should not show recipes-spinner when fetching recipes has finished', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const spinnerElement = screen.getByTestId('recipes-spinner');

    await waitFor(() => screen.getAllByTestId(/recipe-testId-/i), { timeout: 1100 });
    expect(spinnerElement).not.toBeInTheDocument();
  });
});
