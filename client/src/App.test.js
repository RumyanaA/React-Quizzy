/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './app/home/home';

test('renders Random food joke label', () => {
  render(<Home />);
  const linkElement = screen.getByTestId('random-food-joke-label');
  // expect(linkElement).toBeInTheDocument();
  expect(linkElement).to.equal('Random food joke:');
});
