import { useState } from "react";
import InputField from "../../shared/input/input-component";
import { apiKey } from "../../config/cooking-apiKey";
import "./ingridient-search-style.scss";
import "../layout/main-content/shared-style.scss";
import Button from "../../shared/button/button-component";
import SearchedRecipeCard from "../shared-components/searchedRecipeCard/searched-recipe-card";
import IngridientCard from "../shared-components/ingridient-card/ingridient-card";
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
  const addIngridient = (item) => {
    setSelectedIngridients([...selectedIngridients, item]);
  };
  const removeIngridient = (item) =>{
    const currentSelectedIngridients = selectedIngridients;
    const indexToRemove = currentSelectedIngridients.findIndex(ingridient=>ingridient.id === item.id);
    currentSelectedIngridients.splice(indexToRemove,1);
    setSelectedIngridients([...currentSelectedIngridients]);
  }
  const searchRecipe = async () => {
    const ingridientNames = selectedIngridients.map((item) => item.name);
    const ingridientUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingridientNames}&apiKey=${apiKey}`;
    await fetchRecipes(ingridientUrl);
  };
  const fetchRecipes = async (ingridientUrl) => {
    await fetch(ingridientUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  };
  return (
    <>
      <div className="searchInput-Button-container">
        <InputField
          placeholder="Search ingridients..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button onClick={searchRecipe} label="Search recipe" />
      </div>
      <div className="all-ingridients-title">
        <div className="all-ingridients-left-line"></div>All Ingridients{" "}
        <div className="all-ingridients-right-line"></div>
      </div>
      <div className="ingridients-container">
        {ingridients?.map((item,index) => {
            return (
                <IngridientCard key={index} props={item} addIngridient={addIngridient} selectedIngridient={false}/>
                 );
        })}
      </div>
      <div className="all-ingridients-title">
        <div className="all-ingridients-left-line"></div>My Ingridients
        <div className="all-ingridients-right-line"></div>
      </div>
      <div className="selected-ingridients-container">
        {selectedIngridients?.map((item,index) => {
          return (
         <IngridientCard key={index} props={item} removeIngridient={removeIngridient} selectedIngridient={true}/>
          );
        })}
      </div>
      <div className="all-ingridients-title">
        <div className="all-ingridients-left-line"></div>Found Recipes
        <div className="all-ingridients-right-line"></div>
      </div>
      <div className="recipe-cards-container">
        {recipes?.map((recipe, index) => {
          return <SearchedRecipeCard key={index} props={recipe} />;
        })}
      </div>
    </>
  );
};

export default IngridientSearch;
