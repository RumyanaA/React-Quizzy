/* eslint-disable no-undef */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from './app/home/home';
import Discover from './app/discover/discover';

beforeAll(() => {
  const mockUser = { username: 'Anelia', password: '123' };
  window.localStorage.setItem('user', JSON.stringify(mockUser));
});

let history;

beforeEach(() => {
  history = createBrowserHistory();
});

test('renders Random food joke label', () => {
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

test('should render navigation buttons in discover page', () => {
  render(
    <Router location={history.location} navigator={history}>
      <Discover />
    </Router>,
  );
  const keywordNavigation = screen.getByTestId('keyword-navigation');

  const ingridientsNavigation = screen.getByTestId('ingridients-navigation');

  const nutritionsNavigation = screen.getByTestId('nutritions-navigation');

  expect(keywordNavigation).toBeInTheDocument();
  expect(ingridientsNavigation).toBeInTheDocument();
  expect(nutritionsNavigation).toBeInTheDocument();
});
