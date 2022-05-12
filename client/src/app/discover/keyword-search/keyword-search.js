import { useRef, useState } from "react";
import InputField from "../../../shared/input/input-component";
import { apiKey } from "../../../config/cooking-apiKey";
import SearchedRecipeCard from "../../shared-components/searchedRecipeCard/searched-recipe-card";
import RecipeCard from "../../shared-components/recipe-cards/recipeCards";
import TitleComponents from "../../shared-components/titles-component/titles-component";
import Spinner from "react-bootstrap/Spinner";
import './keyword-search-style.scss';
const KeywordSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const timeout = useRef();
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchValue}`;

  const handleChange = (value) => {
    setSearchValue(value);
    if(!loadingRecipes){
      setLoadingRecipes(true);
    }
    if (!value) {
      fetchRandomRecipes();
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
      fetchRecipes();
    }
  }
  const fetchRecipes = async () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
    const response = await fetch(url)
    const data = await response.json()
        if (data.results.length > 0) {
          setSearchedRecipes(data.results);
        }
        if (searchedRecipes) {
          setRandomRecipes([]);
        }
        setLoadingRecipes(false);
    },1000);
  };
  const fetchRandomRecipes = async () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`
    )
      const data = await response.json()
        setRandomRecipes(data.recipes);
        if (randomRecipes) {
          setSearchedRecipes([]);
        }
        setLoadingRecipes(false);
    },1000)
  };
  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {loadingRecipes ? <Spinner animation="grow" variant="primary" /> : null}
      </div>
      {randomRecipes.length?<div className="recipe-cards-container">
        {randomRecipes?.map((recipe, index) => {
          return <RecipeCard key={index} props={recipe} />;
        })}
      </div>
      :
      <div className="recipe-cards-container">
        {searchedRecipes?.map((recipe, index) => {
          return <SearchedRecipeCard key={index} props={recipe} />;
        })}
      </div>}
      
      
      <button onClick={fetchRandomRecipes}>show recipes</button>
    </>
  );
};
export default KeywordSearch;
