/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import useApi from '../../../../__mocks__/useApi';
import IngridientSearch from '../ingridient-search';

let history;

beforeEach(() => {
  history = createBrowserHistory();
  jest.spyOn(window, 'fetch').mockImplementation(useApi);
});

function MockIngridientSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <IngridientSearch />
    </Router>
  );
}

// test('should render one card', async () => {
//   render(
//     <MockIngridientSearch />,
//   );
//   const divEllement = await screen.findByTestId('ingridient-testid-0');
//   expect(divEllement).toBeInTheDocument();
// });
