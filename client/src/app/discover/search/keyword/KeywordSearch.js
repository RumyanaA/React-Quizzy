import { React, useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Spinner from 'react-bootstrap/Spinner';
import { InputField, SearchedRecipeCard, Title, NoDataFoundMessage } from '../../../../components';
import { fetchRecipesByKeyword, fetchRandomRecipes } from '../../../../service';
import './keywordSearch.scss';

function KeywordSearch() {
  const [keyword, setKeyword] = useState('');

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    debounce(
      ({ target: { value } }) => setKeyword(value),
      5000,
    ),
    [],
  );

  useEffect(() => {
    setLoading(true);
    if (keyword) {
      fetchRecipesByKeyword({ keyword })
        .then((response) => response.json())
        .then(({ results }) => setRecipes(results))
        .finally(() => setLoading(false));
    } else {
      fetchRandomRecipes()
        .then((response) => response.json())
        .then(({ recipes: fetchedRecipes }) => setRecipes(fetchedRecipes))
        .finally(() => setLoading(false));
    }
  }, [keyword]);

  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={handleChange}
        />
      </div>
      <Title title="Found Recipes" />
      {
        loading
          ? (
            <div className="spinner-div">
              <Spinner animation="grow" variant="primary" />
            </div>
          )
          : (
            <div className="recipe-cards-container">
              {recipes.length > 0
                ? recipes?.map(
                  (recipe, index) => (
                    <SearchedRecipeCard
                      testId={`searched-recipe-card-${index}`}
                      key={index}
                      props={recipe}
                    />
                  ),
                )
                : <NoDataFoundMessage message="No Recipes Found" />}
            </div>
          )
      }
    </>
  );
}

export default KeywordSearch;
