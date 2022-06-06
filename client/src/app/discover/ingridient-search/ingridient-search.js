/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
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
import useApiIngridients from '../../shared-components/apiCalls/useApiIngridients';
import useApi from '../../shared-components/apiCalls/useApi';
import NoDataFoundMsg from '../../shared-components/no-data-found-message/no-data-found-message';

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
              <Spinner data-testid="spinner" animation="grow" variant="primary" />
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
        {hasInputValue && !hasIngridientsResult && !ingridientsLoading ? <NoDataFoundMsg message="No Ingridients Found" /> : null}
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
            key={index}
            props={item}
            removeIngridient={removeIngridient}
            selectedIngridient
          />
        ))}
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner animation="grow" variant="primary" />}
      </div>
      <div className="recipe-cards-container">
        {!hasIngridientsResult ? (
          <div className="ingridients-img-container">
            <img className="ingridients-img" alt="recipes" src={recipesImg} />
          </div>
        )
          : recipes?.map((recipe, index) => (
            <SearchedRecipeCard key={index} props={recipe} />
          ))}
      </div>
    </>
  );
}

export default IngridientSearch;
