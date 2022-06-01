/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from '../home';

beforeAll(() => {
  const mockUser = { username: 'Anelia', password: '123' };
  window.localStorage.setItem('user', JSON.stringify(mockUser));
});

let history;

beforeEach(() => {
  history = createBrowserHistory();
});

describe('Home Page', () => {
  test('renders Random food joke label', async () => {
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
  //   test('renders Random food joke paragraph', async () => {
  //     render(
  //       <Router location={history.location} navigator={history}>
  //         <Home />
  //       </Router>,

  //     );
  //     const paragraphElement = await screen.findByTestId('food-joke');
  //     expect(paragraphElement).toBeInTheDocument();
  //   });

  test('should redirect to discover', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('discover'));

    expect(history.location.pathname).toEqual('/discover');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should redirect to menu-planner', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('menu-planner'));

    expect(history.location.pathname).toEqual('/menu-planner');
  });
});
