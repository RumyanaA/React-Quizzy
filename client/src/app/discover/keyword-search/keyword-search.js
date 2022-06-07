import { React, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InputField from '../../../components/input/input-component';
import { apiKey } from '../../../config/cooking-apiKey';
import SearchedRecipeCard from '../../../components/searchedRecipeCard/searched-recipe-card';
import TitleComponents from '../../../components/titles-component/titles-component';
import './keyword-search-style.scss';
import useApi from '../../../hooks/useApi';
import NoDataFoundMsg from '../../../components/no-data-found-message/no-data-found-message';

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
