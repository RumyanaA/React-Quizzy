/* eslint-disable import/prefer-default-export */

import { apiKey } from './config';

export const fetchRandomRecipes = ({ number }) => fetch(
  `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${number}`,
);

export const fetchRandomFoodJoke = () => fetch(
  `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`,
);
