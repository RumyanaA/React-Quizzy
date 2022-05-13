import InputField from "../../../shared/input/input-component";
import { apiKey } from "../../../config/cooking-apiKey";
import SearchedRecipeCard from "../../shared-components/searchedRecipeCard/searched-recipe-card";
import RecipeCard from "../../shared-components/recipe-cards/recipeCards";
import TitleComponents from "../../shared-components/titles-component/titles-component";
import Spinner from "react-bootstrap/Spinner";
import './keyword-search-style.scss';
import useApi from "../../shared-components/apiCalls/useApi";
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

const getRecipes = () => fetch(url);
const KeywordSearch = () => {
  const getRecipesApi = useApi(getRecipes);

  const handleChange = (value) => {
    if (!value) {
      url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}`;
    }
    fetchRecipes();
  }
  const fetchRecipes =  () => {
    getRecipesApi.request();
  };
  return (
    <>
      <div className="search-container">
        <InputField
          placeholder="Search recipes by keyword..."
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <TitleComponents title="Found Recipes" />
      <div className="spinner-div">
        {getRecipesApi.loading && <Spinner animation="grow" variant="primary" />}
      </div>
      {getRecipesApi.randomRecipes.length?
      <div className="recipe-cards-container">
        {getRecipesApi.randomRecipes?.map((recipe, index) => {
          return <RecipeCard key={index} props={recipe} />;
        })}
      </div>
       :
      <div className="recipe-cards-container">
        {getRecipesApi.recipes?.map((recipe, index) => {
          return <SearchedRecipeCard key={index} props={recipe} />;
        })}
      </div>
      }
    </>
  );
};
export default KeywordSearch;
