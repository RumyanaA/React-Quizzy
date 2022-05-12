import { useRef, useState } from "react";
import InputField from "../../../shared/input/input-component";
import { apiKey } from "../../../config/cooking-apiKey";
import Spinner from "react-bootstrap/esm/Spinner";
import "./recipe-search-and-select-style.scss";

const RecipeSearchAndSelect = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [toggleDropDown, setToggleDropdown] = useState(false);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const timeout = useRef();
  const handleChange = (value) => {
    setSearchValue(value);
    if (!value) {
        setRecipeOptions([]);
        setLoadingRecipes(false);
        setToggleDropdown(false);
        return;
      }
      if(!toggleDropDown){
        setToggleDropdown(true);
      } if(!loadingRecipes){
        setLoadingRecipes(true);
      }
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
    fetchRecipes(url);
  };
  const fetchRecipes = (url) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            setRecipeOptions(data.results);
          }
          setLoadingRecipes(false);
        });
    }, 1000);
  };
  const handleSelectOption = (value) => {
    setSearchValue("");
    setSelectedRecipe(value);
    setRecipeOptions([]);
    setToggleDropdown(false);
  };
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
            {loadingRecipes ? (
              <div className="spinner">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : (
              <div>
                {recipeOptions.map((recipeOption) => (
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
};
export default RecipeSearchAndSelect;
