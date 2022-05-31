/* eslint-disable no-undef */
import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from './app/home/home';

const mockUser = { username: 'Anelia', password: '123' };
window.localStorage.setItem('user', JSON.stringify(mockUser));

test('renders Random food joke label', () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Home />
    </Router>,

  );
  const linkElement = screen.getByTestId('random-food-joke-label');
  expect(linkElement).toHaveTextContent(
    'Random food joke:',
  );
});
