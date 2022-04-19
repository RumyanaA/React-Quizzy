import { useState } from "react";
import Wrapper from "../layout/main-content/content-wrapper";
import "./discover-style.scss";
import { apiKey } from "../../config/cooking-apiKey";

const Discover = () => {
  const [searchValue, setSearchValue] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const inputPlaceholder = "Search recipes by keyword...";
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchValue}`;
  const handleChange = (value) => {
    setSearchValue(value);
    if(!value){
      fetchRandomRecipes();
    }else{
      url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
      fetchRecipes();
    }
  };
  const fetchRecipes = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if(data.results.length>0){
          setSearchedRecipes(data.results);
        }
        if(searchedRecipes){
          setRandomRecipes([])
        }
      });
  };
  const fetchRandomRecipes = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setRandomRecipes(data.recipes);
        if(randomRecipes){
          setSearchedRecipes([])
        }
      });
  };
  return (
    <div>
      <Wrapper
        searchedRecipes={searchedRecipes}
        recipes={randomRecipes}
        handleChange={handleChange}
        placeholder={inputPlaceholder}
      />
      <button onClick={fetchRandomRecipes}>show recipes</button>
    </div>
  );
};

export default Discover;
