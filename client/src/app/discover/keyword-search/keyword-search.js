import { React, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InputField from '../../../shared/input/input-component';
import { apiKey } from '../../../config/cooking-apiKey';
import SearchedRecipeCard from '../../shared-components/searchedRecipeCard/searched-recipe-card';
import RecipeCard from '../../shared-components/recipe-cards/recipeCards';
import TitleComponents from '../../shared-components/titles-component/titles-component';
import './keyword-search-style.scss';
import useApi from '../../shared-components/apiCalls/useApi';
import NoDataFoundMsg from '../../shared-components/no-data-found-message/no-data-found-message';

function KeywordSearch() {
  const [url, setUrl] = useState();

  const {
    recipes,
    randomRecipes,
    hasResult,
    loading,
  } = useApi({ url });

  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={({ target: { value } }) => setUrl(
            value
              ? `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`
              : `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`,
          )}
        />
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner animation="grow" variant="primary" />}
      </div>
      {randomRecipes.length
        ? (
          <div className="recipe-cards-container">
            {randomRecipes?.map((recipe, index) => <RecipeCard key={index} props={recipe} />)}
          </div>
        )
        : (
          <div className="recipe-cards-container">
            {hasResult
              ? recipes?.map((recipe, index) => <SearchedRecipeCard key={index} props={recipe} />)
              : <NoDataFoundMsg message="No Recipes Found" />}
          </div>
        ) }
    </>
  );
}

export default KeywordSearch;
