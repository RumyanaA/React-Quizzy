import React from 'react';
import { createBrowserHistory } from 'history';
import {
  render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { server } from '../../../../mocks/server';
import NutritionsSearch from '../nutritions.search';

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

function MockNutritionsSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <NutritionsSearch />
    </Router>
  );
}

describe('Nutritions search tests', () => {
  test('should render a button', () => {
    render(
      <MockNutritionsSearch />,
    );
    const searchRecipesButton = screen.getByRole('button', { name: 'Search Recipes' });
    expect(searchRecipesButton).toBeInTheDocument();
  });
});
