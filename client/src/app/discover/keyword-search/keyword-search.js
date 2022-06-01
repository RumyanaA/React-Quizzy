import { React, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InputField from '../../../shared/input/input-component';
import { apiKey } from '../../../config/cooking-apiKey';
import SearchedRecipeCard from '../../shared-components/searchedRecipeCard/searched-recipe-card';
import TitleComponents from '../../shared-components/titles-component/titles-component';
import './keyword-search-style.scss';
import useApi from '../../shared-components/apiCalls/useApi';
import NoDataFoundMsg from '../../shared-components/no-data-found-message/no-data-found-message';

function KeywordSearch() {
  const [url, setUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`);

  const {
    recipes,
    hasResult,
    loading,
  } = useApi({ url });

  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={({ target: { value } }) => setUrl(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`)}
        />
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner animation="grow" variant="primary" />}
      </div>
      <div className="recipe-cards-container">
        {hasResult
          ? recipes?.map((recipe, index) => <SearchedRecipeCard testId={`searched-recipe-card-${index}`} key={index} props={recipe} />)
          : <NoDataFoundMsg message="No Recipes Found" />}
      </div>
    </>
  );
}

export default KeywordSearch;
