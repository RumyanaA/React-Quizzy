import { useState, useEffect } from 'react';

const useApiWithoutLloader = ({ url }) => {
  const [recipe, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(async () => {
    if (url) {
      try {
        const result = await fetch(url);
        const resBody = await result.json();
        if (resBody.results) {
          setRecipes(resBody.results);
        }
      } catch (err) {
        setError(err.message || 'Unexpected Error');
      }
    }
  }, [url]);

  return {
    recipe,
    error,
  };
};

export default useApiWithoutLloader;
