/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
// import { apiKey } from '../config/cooking-apiKey';

export const handlers = [

  rest.get('https://api.spoonacular.com/food/ingredients/search', (req, res, ctx) => {
    req.url.searchParams.get('query');
    req.url.searchParams.get('apiKey');
    return res(
      ctx.delay(100),
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

];
