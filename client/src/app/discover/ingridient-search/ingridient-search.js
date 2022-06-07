/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { apiKey } from '../../../config/cooking-apiKey';
import './ingridient-search-style.scss';
import '../../../components/layout/main-content/shared-style.scss';
import Button from '../../../components/button/button-component';
import SearchedRecipeCard from '../../../components/searchedRecipeCard/searched-recipe-card';
import IngridientCard from '../../../components/ingridient-card/ingridient-card';
import ingridientsImg from '../../../components/ingridients.jpg';
import fridgeIngridientsImg from '../../../components/fridge.jpg';
import recipesImg from '../../../components/recipes.jpg';
import TitleComponents from '../../../components/titles-component/titles-component';
import InputField from '../../../components/input/input-component';
import useApiIngridients from '../../../hooks/useApiIngridients';
import useApi from '../../../hooks/useApi';
import NoDataFoundMsg from '../../../components/no-data-found-message/no-data-found-message';

function IngridientSearch() {
  const [selectedIngridients, setSelectedIngridients] = useState([]);

  const [ingridientsUrl, setIngridientsUrl] = useState();

  const [url, setUrl] = useState();

  const [hasInputValue, setHasInputValue] = useState(false);

  const {
    ingridients,
    hasIngridientsResult,
    ingridientsLoading,
  } = useApiIngridients({ ingridientsUrl });

  const {
    recipes,
    loading,
  } = useApi({ url });

  const handleChange = (value) => {
    value.length ? setHasInputValue(true) : setHasInputValue(false);
    setIngridientsUrl(`https://api.spoonacular.com/food/ingredients/search?query=${value}&apiKey=${apiKey}`);
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

  const searchRecipe = async () => {
    const ingridientNames = selectedIngridients.map((item) => item.name);

    setUrl(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingridientNames}&apiKey=${apiKey}`);
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
        {!hasInputValue
          ? <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src={ingridientsImg}
            />
          </div> : ingridientsLoading
            ? <div className="spinner-div">
              <Spinner data-testid="ingridients-spinner" animation="grow" variant="primary" />
            </div> : hasIngridientsResult
            && ingridients?.map((item, index) => (
              <IngridientCard
                testId={`ingridient-testid-${index}`}
                key={index}
                props={item}
                addIngridient={addIngridient}
                selectedIngridient={false}
              />
            ))}
        {hasInputValue && !hasIngridientsResult && !ingridientsLoading ? <NoDataFoundMsg testid="no-ingridients-found" message="No Ingridients Found" /> : null}
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
        ) : selectedIngridients?.map((item, index) => (
          <IngridientCard
            testId={`selectedIngridient-testid-${index}`}
            key={index}
            props={item}
            removeIngridient={removeIngridient}
            selectedIngridient
            divTestId={`div-X-testid-${index}`}
          />
        ))}
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner data-testid="recipes-spinner" animation="grow" variant="primary" />}
      </div>
      <div className="recipe-cards-container">
        {!hasIngridientsResult ? (
          <div className="ingridients-img-container">
            <img className="ingridients-img" alt="recipes" src={recipesImg} />
          </div>
        )
          : recipes?.map((recipe, index) => (
            <SearchedRecipeCard testId={`recipe-testId-${index}`} key={index} props={recipe} />
          ))}
      </div>
    </>
  );
}

export default IngridientSearch;
