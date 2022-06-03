/* eslint-disable no-undef */
const mockResponse = {
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
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
