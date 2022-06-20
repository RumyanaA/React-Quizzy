import { React, useState } from 'react';
import { Button, SearchedRecipeCard, Title } from '../../../../components';
import { fetchRecipesByNutrition } from '../../../../service';
import './nutritionsSearch.scss';

function NutritionsSearch() {
  const [nutrition, setNutrition] = useState({
    carbs: 55,
    protein: 55,
    calories: 400,
    fat: 50,
  });

  const {
    carbs, protein, calories, fat,
  } = nutrition;

  const [recipes, setRecipes] = useState([]);

  const handleChange = (name) => ({ target: { value } }) => {
    setNutrition({ ...nutrition, [name]: value });
  };

  const fetchRecipes = () => {
    fetchRecipesByNutrition({ ...nutrition })
      .then((response) => response.json())
      .then(setRecipes);
  };

  return (
    <>
      <div className="sliders-wrapper">
        <p className="nutrition-value">
          {carbs}
          g
        </p>
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
            value={nutrition.carbs}
            onChange={handleChange('carbs')}
          />
        </div>
        <p className="nutrition-value">
          {protein}
          g
        </p>
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
            value={nutrition.protein}
            onChange={handleChange('protein')}
          />
        </div>
        <p className="nutrition-value">
          {calories}
          kcal
        </p>
        <div className="slider-container">
          <label className="label-style" htmlFor="calories">
            {' '}
            Max Calories (between 50 and 800):
          </label>
          <input
            className="slider"
            type="range"
            id="calories"
            name="calories"
            min="50"
            max="800"
            value={nutrition.calories}
            onChange={handleChange('calories')}
          />
        </div>
        <p className="nutrition-value">
          {fat}
          g
        </p>
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
            value={nutrition.fat}
            onChange={handleChange('fat')}
          />
        </div>
      </div>
      <div className="button-container">
        {' '}
        <Button onClick={fetchRecipes} label="Search Recipes" />
      </div>
      <Title title="Found Recipes" />
      <div className="recipe-cards-container">
        {
          recipes.length === 0
            ? (
              <div className="ingridients-img-container">
                <img className="ingridients-img" alt="recipes" src="img/recipes.jpg" />
              </div>
            )
            : null
        }
        {
          recipes?.map((recipe, index) => (
            <SearchedRecipeCard
              testId={`recipe-card-testid-${index}`}
              key={index}
              props={recipe}
            />
          ))
        }
      </div>
    </>
  );
}

export default NutritionsSearch;
