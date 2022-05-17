import { useRef, useState, useEffect } from "react";

const useApi = ({ url }) => {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    if (url) {
      setLoading(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        try {
          const result = await fetch(url);
          const resBody = await result.json()
          if (resBody.results) {
            setRecipes(resBody.results)
          } else {
            setRandomRecipes(resBody.recipes);
          }
        } catch (err) {
          console.log(err.message);
          setError(err.message || "Unexpected Error");
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  }, [url]);

  return {
    recipes,
    randomRecipes,
    error,
    loading
  };
}

export default useApi;
