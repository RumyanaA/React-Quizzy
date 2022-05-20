/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import InputField from '../../../shared/input/input-component';
import { apiKey } from '../../../config/cooking-apiKey';
import './recipe-search-and-select-style.scss';
import useApi from '../apiCalls/useApi';
import useApiWithoutLoader from '../apiCalls/useApiWithoutLoader';

function RecipeSearchAndSelect({
  sendData,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [toggleDropDown, setToggleDropdown] = useState(false);
  const [url, setUrl] = useState();
  const [secondUrl, setSecondUrl] = useState('');
  const [recipe] = useApiWithoutLoader(secondUrl);
  const {
    recipes,
    loading,
  } = useApi({ url });

  const handleChange = (value) => {
    setSearchValue(value);
    if (!value) {
      setToggleDropdown(false);
      return;
    }
    if (!toggleDropDown) {
      setToggleDropdown(true);
    }
    setUrl(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`);
  };
  const handleSelectOption = (value) => {
    setSecondUrl(`https://api.spoonacular.com/recipes/${value.id}/information?apiKey=${apiKey}`);
    setSearchValue('');
    setToggleDropdown(false);
  };
  useEffect(() => {
    if (Object.keys(recipe).length !== 0) {
      sendData(recipe);
    }
  }, [recipe]);
  return (
    <>
      <InputField
        placeholder="Search recipes by keyword..."
        onChange={(e) => handleChange(e.target.value)}
        value={searchValue}
        autoComplete="off"
      />
      <div>
        {toggleDropDown && (
          <div className="dropdown-content">
            {loading ? (
              <div className="spinner">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : (
              <div>
                {recipes.map((recipeOption) => (
                  <option
                    className="dropdown-option"
                    onClick={() => handleSelectOption(recipeOption)}
                    key={recipeOption.id}
                    value={recipeOption.title}
                  >
                    {recipeOption.title}
                  </option>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default RecipeSearchAndSelect;
