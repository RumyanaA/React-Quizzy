/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useApi, useApiIngridients } from '../../../../hooks';
import { Button, SearchedRecipeCard, IngridientCard, Title, InputField, NoDataFoundMessage } from '../../../../components';
import { apiKey } from '../../../../config';
import './ingridientSearch.scss';
import '../../../../sharedStyles.scss';

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
        <Button
          onClick={searchRecipe}
          label="Search recipe"
        />
      </div>
      <Title title="All Ingridients" />
      <div className="ingridients-container">
        {!hasInputValue
          ? <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/ingridients.jpg"
            />
          </div> : ingridientsLoading
            ? <div className="spinner-div">
              <Spinner
                data-testid="ingridients-spinner"
                animation="grow"
                variant="primary"
              />
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
        {hasInputValue && !hasIngridientsResult && !ingridientsLoading ? <NoDataFoundMessage
          testid="no-ingridients-found"
          message="No Ingridients Found"
        /> : null}
      </div>
      <Title title="My Ingridients" />
      <div className="selected-ingridients-container">
        {selectedIngridients.length === 0 ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/fridge.jpg"
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
      <Title title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner
          data-testid="recipes-spinner"
          animation="grow"
          variant="primary"
        />}
      </div>
      <div className="recipe-cards-container">
        {!hasIngridientsResult ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="recipes"
              src="img/recipes.jpg"
            />
          </div>
        )
          : recipes?.map((recipe, index) => (
            <SearchedRecipeCard
              testId={`recipe-testId-${index}`}
              key={index}
              props={recipe}
            />
          ))}
      </div>
    </>
  );
}

export default IngridientSearch;
