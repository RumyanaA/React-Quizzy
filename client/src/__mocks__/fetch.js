/* eslint-disable no-undef */
const mockResponse = {
  results: [
    {
      id: 716426, title: 'Rumy\'s recipe', image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg', imageType: 'jpg',
    },
    {
      id: 715594, title: 'Homemade Garlic and Basil French Fries', image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg', imageType: 'jpg',
    },
  ],
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
