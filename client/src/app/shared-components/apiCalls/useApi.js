/* eslint-disable import/no-anonymous-default-export */
import { useRef, useState } from "react";

export default (apiFunc) => {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timeout = useRef();

  const request = async (...args) => {
      if(!loading){
        setLoading(true);
      }   
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
    try {
      const result = await apiFunc(...args);
      const res = await result.json()
      if(res.results){
          setRecipes(res.results)
      }else{
        setRandomRecipes(res.recipes);
      }
    } catch (err) {
        console.log(err.message)
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
},1000)
  };

  return {
    recipes,
    randomRecipes,
    error,
    loading,
    request
  };
};