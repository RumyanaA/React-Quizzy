import { useRef, useState, useEffect } from 'react';

const useApi = ({ url }) => {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const timeout = useRef();

  useEffect(() => {
    if (url) {
      setLoading(true);
      setHasResult(true);
      setRandomRecipes([]);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        try {
          const result = await fetch(url);
          const resBody = await result.json();
          if (resBody.results) {
            // eslint-disable-next-line no-unused-expressions
            if (resBody.results.length === 0) {
              setHasResult(false);
            } else {
              setHasResult(true);
            }

            setRecipes(resBody.results);
          } else {
            setRandomRecipes(resBody.recipes);
          }
        } catch (err) {
          setError(err.message || 'Unexpected Error');
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  }, [url]);

  return {
    recipes,
    randomRecipes,
    hasResult,
    error,
    loading,
  };
};

export default useApi;
