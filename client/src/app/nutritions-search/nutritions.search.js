import { useState } from "react";
import Button from "../../shared/button/button-component";
import SearchedRecipeCard from "../shared-components/searchedRecipeCard/searched-recipe-card";
import "./nutritions-search-style.scss";
import { apiKey } from "../../config/cooking-apiKey";

const NutritionsSearch = () => {
  const [nutritions, setNutritions] = useState({
    carbs: 55,
    protein: 55,
    calories: 400,
    fat: 50,
  });
  const { carbs, protein, calories,fat} = nutritions;
  const [recipes, setRecipes] = useState([]);
  const handleChange = (name) => (event) => {
    setNutritions({ ...nutritions, [name]: event.target.value });
  };
  const searchRecipe = async () => {
    const nutritionsUrl = `https://api.spoonacular.com/recipes/findByNutrients?maxCarbs=${nutritions.carbs}&maxProtein=${nutritions.protein}&maxCalories=${nutritions.calories}&maxFat=${nutritions.fat}&apiKey=${apiKey}`;
    await fetchRecipes(nutritionsUrl);
  };
  const fetchRecipes = async (nutritionsUrl) => {
    await fetch(nutritionsUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  };
  return (
    <>
      <div className="sliders-wrapper">
      <p className="nutrition-value">{carbs}g</p>
        <div className="slider-container">
          <label className="label-style" htmlFor="carbs">
            Max Carbs (between 10 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="carbs"
            name="carbs"
            min="10"
            max="100"
            defaultValue={nutritions.carbs}
            onChange={handleChange("carbs")}
          ></input>
        </div>
        <p className="nutrition-value">{protein}g</p>
        <div className="slider-container">
          <label className="label-style" htmlFor="protein">
            Max Protein (between 10 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="protein"
            name="protein"
            min="10"
            max="100"
            defaultValue={nutritions.protein}
            onChange={handleChange("protein")}
          ></input>
        </div>
        <p className="nutrition-value">{calories}kcal</p>
        <div className="slider-container">
          <label className="label-style" htmlFor="calories">
            {" "}
            Max Calories (between 50 and 800):
          </label>
          <input
            className="slider"
            type="range"
            id="calories"
            name="calories"
            min="50"
            max="800"
            defaultValue={nutritions.calories}
            onChange={handleChange("calories")}
          ></input>
        </div>
        <p className="nutrition-value">{fat}g</p>
        <div className="slider-container">
          <label className="label-style" htmlFor="fat">
            Max Fat (between 1 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="fat"
            name="fat"
            min="1"
            max="100"
            defaultValue={nutritions.fat}
            onChange={handleChange("fat")}
          ></input>
        </div>
      </div>
      <div className="button-container"> <Button onClick={searchRecipe} label='Search Recipes'></Button></div>
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
export default NutritionsSearch;
