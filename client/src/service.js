/* eslint-disable import/prefer-default-export */

import { apiKey } from './config';

export const fetchRandomRecipes = ({ number = 10 } = {}) => fetch(
  `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${number}`,
);

export const fetchRandomFoodJoke = () => fetch(
  `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`,
);

export const fetchRecipesByKeyword = ({ keyword }) => fetch(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}`,
);
