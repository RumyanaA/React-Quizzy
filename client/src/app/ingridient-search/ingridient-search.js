import { useState } from "react";
import InputField from "../../shared/input/input-component";
import { apiKey } from "../../config/cooking-apiKey";
import './ingridient-search-style.scss';
import '../layout/main-content/shared-style.scss';
import Button from "../../shared/button/button-component";
import RecipeCard from "../shared-components/recipe-cards/recipeCards";
import SearchedRecipeCard from "../shared-components/searchedRecipeCard/searched-recipe-card";
const IngridientSearch = () => {
  const [ingridients, setIngridients] = useState([]);
  const [selectedIngridients, setSelectedIngridients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  let url = "https://api.spoonacular.com/food/ingredients/search?query=";
  const handleChange = (value) => {
    url = `https://api.spoonacular.com/food/ingredients/search?query=${value}&apiKey=${apiKey}`;
    fetchIngridients();
  };
  const fetchIngridients = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIngridients(data.results);
      });
  };
  const addIngridient = (event)=>{
      setSelectedIngridients(event.target.alt)
  }
  const searchRecipe = async()=>{
      const ingridientUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${selectedIngridients}&apiKey=${apiKey}`
       await fetchRecipes(ingridientUrl)
    }
  const fetchRecipes = async (ingridientUrl) => {
    await fetch(
     ingridientUrl
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  };
  return (
    <>
      <InputField
        placeholder="Search ingridients..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="ingridients-container">
      {ingridients?.map((item, index) => {
        return (
          <div className="ingridient-info" key={index} onClick={addIngridient}>
            <img className="ingridient-img"
              alt={item.name}
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
            ></img>
            <h6>{item.name}</h6>
          </div>
        );
      })}
      </div>
      <Button onClick={searchRecipe} label='Search recipe' />
      <div className="recipe-cards-container">
            {recipes?.map((recipe, index) => {
              return <SearchedRecipeCard key={index} props={recipe} />
            })}
          </div>
    </>
  );
};

export default IngridientSearch;
