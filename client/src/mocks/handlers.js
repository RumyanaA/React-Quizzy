/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
// import { apiKey } from '../config/cooking-apiKey';

export const handlers = [

  rest.get('https://api.spoonacular.com/food/ingredients/search', (req, res, ctx) => {
    req.url.searchParams.get('query');
    req.url.searchParams.get('apiKey');
    return res(
      ctx.status(200),
      ctx.json({
        number: 2,
        offset: 0,
        results: [
          {
            id: 10019297, name: 'apple jelly', image: 'apple-jelly.jpg',
          },
          {
            id: 19294, name: 'apple butter', image: 'apple-jelly.jpg',
          },
        ],
        totalResults: 2,
      }),
    );
  }),

  rest.get('https://api.spoonacular.com/food/jokes/random', (req, res, ctx) => {
    req.url.searchParams.get('apiKey');
    return res(
      ctx.status(200),
      ctx.json({
        text: 'mocked food joke',
      }),
    );
  }),

  rest.get('https://api.spoonacular.com/recipes/findByIngredients', (req, res, ctx) => {
    req.url.searchParams.get('ingridients');
    req.url.searchParams.get('apiKey');
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 715412, title: 'Kiwi Popsicles - Summer Popsicle Series', image: 'https://spoonacular.com/recipeImages/715412-312x231.jpg', imageType: 'jpg', usedIngredientCount: [],
        },
        {
          id: 644782, title: 'Gluten And Dairy Free Peanut Butter Cups', image: 'https://spoonacular.com/recipeImages/644782-312x231.jpg', imageType: 'jpg', usedIngredientCount: [],
        },

      ]),
    );
  }),

];
