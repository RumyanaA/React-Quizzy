import { useEffect, useState } from "react";
import InputField from "../../../shared/input/input-component";
import { apiKey } from "../../../config/cooking-apiKey";
import Spinner from "react-bootstrap/esm/Spinner";

const RecipeSearchAndSelect = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [toggleDropDown, setToggleDropdown] = useState(false);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchValue}`;
  function debounce(fn, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(context, args), delay);
      setLoadingRecipes(true);
      setToggleDropdown(true);
    };
  }
  const handleChange = debounce((value) => {
    setSearchValue(value);
    if (!value) {
        setRecipeOptions([])
        setToggleDropdown(false);
        return;
            
    }
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
    fetchRecipes();
  }, 1000);
  const fetchRecipes = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setRecipeOptions(data.results);
        }
        setLoadingRecipes(false);
      });
  };
  const handleSelectOption = (value) => {
    setSelectedRecipe(value);
  };
  return (
    <>
      <InputField
        placeholder="Search recipes by keyword..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <div>
        {toggleDropDown ? (
          <div>
            {loadingRecipes ? (
              <Spinner animation="grow" variant="primary" />
            ) : (
              <div>
                {recipeOptions.map((recipeOption) => (
                  <option
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
        ) : null}
      </div>
    </>
  );
};
export default RecipeSearchAndSelect;
