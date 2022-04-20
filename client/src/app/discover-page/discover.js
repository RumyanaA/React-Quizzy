import { useState } from "react";
import Wrapper from "../layout/main-content/content-wrapper-depricated";
import "./discover-style.scss";
import { apiKey } from "../../config/cooking-apiKey";
import Header from "../layout/header/header";
import InputField from "../../shared/input/input-component";
import { FaArrowDown } from "react-icons/fa";
import RecipeCard from "../shared-components/recipe-cards/recipeCards";
import SearchedRecipeCard from "../shared-components/searchedRecipeCard/searched-recipe-card";

const Discover = () => {
  const [searchValue, setSearchValue] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const inputPlaceholder = "Search recipes by keyword...";
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
    <div>
      <Header />
      <div className="wrapper">
        <div className="search-container">
          <InputField
            placeholder={inputPlaceholder}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div className="filters-container">
            <FaArrowDown className="arrow-down" />
          </div>
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
      </div>
      <button onClick={fetchRandomRecipes}>show recipes</button>
    </div>
  );
};

export default Discover;
