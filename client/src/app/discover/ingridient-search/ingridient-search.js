import { React, useState } from 'react';
import { apiKey } from '../../../config/cooking-apiKey';
import './ingridient-search-style.scss';
import '../../layout/main-content/shared-style.scss';
import Button from '../../../shared/button/button-component';
import SearchedRecipeCard from '../../shared-components/searchedRecipeCard/searched-recipe-card';
import IngridientCard from '../../shared-components/ingridient-card/ingridient-card';
import ingridientsImg from '../../../shared/ingridients.jpg';
import fridgeIngridientsImg from '../../../shared/fridge.jpg';
import recipesImg from '../../../shared/recipes.jpg';
import TitleComponents from '../../shared-components/titles-component/titles-component';
import InputField from '../../../shared/input/input-component';

function IngridientSearch() {
  const [ingridients, setIngridients] = useState([]);

  const [selectedIngridients, setSelectedIngridients] = useState([]);

  const [recipes, setRecipes] = useState([]);
  let url = 'https://api.spoonacular.com/food/ingredients/search?query=';
  const fetchIngridients = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIngridients(data.results);
      });
  };

  const handleChange = (value) => {
    url = `https://api.spoonacular.com/food/ingredients/search?query=${value}&apiKey=${apiKey}`;

    fetchIngridients();
  };

  const addIngridient = (item) => {
    setSelectedIngridients([...selectedIngridients, item]);
  };

  const removeIngridient = (item) => {
    const currentIngridients = selectedIngridients;

    const indexToRemove = currentIngridients.findIndex(
      (ingridient) => ingridient.id === item.id,
    );
    currentIngridients.splice(indexToRemove, 1);

    setSelectedIngridients([...currentIngridients]);
  };

  const fetchRecipes = async (ingridientUrl) => {
    await fetch(ingridientUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  };

  const searchRecipe = async () => {
    const ingridientNames = selectedIngridients.map((item) => item.name);

    const ingridientUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingridientNames}&apiKey=${apiKey}`;
    await fetchRecipes(ingridientUrl);
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
      <TitleComponents title="All Ingridients" />
      <div className="ingridients-container">
        {ingridients.length === 0 ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src={ingridientsImg}
            />
          </div>
        ) : null}
        {ingridients?.map((item, index) => (
          <IngridientCard
            key={index}
            props={item}
            addIngridient={addIngridient}
            selectedIngridient={false}
          />
        ))}
      </div>
      <TitleComponents title="My Ingridients" />
      <div className="selected-ingridients-container">
        {selectedIngridients.length === 0 ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src={fridgeIngridientsImg}
            />
          </div>
        ) : null}

        {selectedIngridients?.map((item, index) => (
          <IngridientCard
            key={index}
            props={item}
            removeIngridient={removeIngridient}
            selectedIngridient
          />
        ))}
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="recipe-cards-container">
        {selectedIngridients.length === 0 ? (
          <div className="ingridients-img-container">
            <img className="ingridients-img" alt="recipes" src={recipesImg} />
          </div>
        ) : null}
        {recipes?.map((recipe, index) => (
          <SearchedRecipeCard key={index} props={recipe} />
        ))}
      </div>
    </>
  );
}

export default IngridientSearch;
