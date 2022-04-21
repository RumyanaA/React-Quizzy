import { useState } from "react";
import InputField from "../../shared/input/input-component";
import { apiKey } from "../../config/cooking-apiKey";
import SearchedRecipeCard from "../shared-components/searchedRecipeCard/searched-recipe-card";
import RecipeCard from "../shared-components/recipe-cards/recipeCards";
const KeywordSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchValue}`;
  const handleChange = (value) => {
    setSearchValue(value);
    if (!value) {
      fetchRandomRecipes();
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
      fetchRecipes();
    }
  };
  const fetchRecipes = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setSearchedRecipes(data.results);
        }
        if (searchedRecipes) {
          setRandomRecipes([]);
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
        if (randomRecipes) {
          setSearchedRecipes([]);
        }
      });
  };
  return (
      <>
    <div className="search-container">
      <InputField
        placeholder="Search recipes by keyword..."
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    <div className="all-ingridients-title">
        <div className="all-ingridients-left-line"></div>Found Recipes{" "}
        <div className="all-ingridients-right-line"></div>
      </div>
    <div className="recipe-cards-container">
    {randomRecipes?.map((recipe, index) => {
      return <RecipeCard key={index} props={recipe} />;
    })}
  </div>
  <div className="recipe-cards-container">
    {searchedRecipes?.map((recipe, index) => {
      return <SearchedRecipeCard key={index} props={recipe} />;
    })}
  </div>
  <button onClick={fetchRandomRecipes}>show recipes</button>
  </>
  );
};
export default KeywordSearch;