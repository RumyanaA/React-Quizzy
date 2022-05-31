/* eslint-disable no-undef */
import React from 'react';
import { createMemoryHistory } from 'history';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from './app/home/home';
import Discover from './app/discover/discover';

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

test('renders navigation cards', () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Home />
    </Router>,
  );
  const discoverCard = screen.getByTestId('discover');
  expect(discoverCard).toBeInTheDocument();
  const menuPlanner = screen.getByTestId('menu-planner');
  expect(menuPlanner).toBeInTheDocument();
  const customRecipe = screen.getByTestId('custom-recipe');
  expect(customRecipe).toBeInTheDocument();
  const favoriteRecipes = screen.getByTestId('favorite-recipes');
  expect(favoriteRecipes).toBeInTheDocument();
});

test('should redirect to discover', () => {
  const history = createMemoryHistory();

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
  const history = createMemoryHistory();

  render(
    <Router location={history.location} navigator={history}>
      <Home />
    </Router>,
  );

  fireEvent.click(screen.getByTestId('menu-planner'));

  expect(history.location.pathname).toEqual('/menu-planner');
});

test('should renders navigation buttons in discover page', () => {
  const history = createMemoryHistory();

  render(
    <Router location={history.location} navigator={history}>
      <Discover />
    </Router>,
  );
  const keywordNavigation = screen.findByTestId('keyword-navigation');

  const ingridientsNavigation = screen.findByTestId('ingridients-navigation');

  const nutritionsNavigation = screen.findByTestId('nutritions-navigation');

  waitFor(() => expect(keywordNavigation).toBeInTheDocument());
  waitFor(() => expect(ingridientsNavigation).toBeInTheDocument());
  waitFor(() => expect(nutritionsNavigation).toBeInTheDocument());
});

// test('', () => {
//   const history = createMemoryHistory();

//   render(
//     <Router location={history.location} navigator={history}>
//       <Home />
//     </Router>,
//   );

//   fireEvent.click(screen.getByTestId('menu-planner'));
//   const calendar = screen.getByRole('div');
//   expect(calendar).toBeInTheDocument();
// });
