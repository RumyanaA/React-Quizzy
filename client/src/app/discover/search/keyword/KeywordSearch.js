import { React, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { InputField, SearchedRecipeCard, Title, NoDataFoundMessage } from '../../../../components';
import { fetchRecipesByKeyword, fetchRandomRecipes } from '../../../../service';
import './keywordSearch.scss';

function KeywordSearch() {
  const [keyword, setKeyword] = useState('');

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (keyword) {
      fetchRecipesByKeyword({ keyword })
        .then((response) => response.json())
        .then(({ results }) => setRecipes(results));
    } else {
      fetchRandomRecipes()
        .then((response) => response.json())
        .then(({ recipes: fetchedRecipes }) => setRecipes(fetchedRecipes));
    }
    setLoading(false);
  }, [keyword]);

  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={({ target: { value } }) => setKeyword(value)}
        />
      </div>
      <Title title="Found Recipes" />
      <div className="spinner-div">
        {loading && <Spinner animation="grow" variant="primary" />}
      </div>
      <div className="recipe-cards-container">
        {recipes.length > 0
          ? recipes?.map((recipe, index) => <SearchedRecipeCard testId={`searched-recipe-card-${index}`} key={index} props={recipe} />)
          : <NoDataFoundMessage message="No Recipes Found" />}
      </div>
    </>
  );
}

export default KeywordSearch;
