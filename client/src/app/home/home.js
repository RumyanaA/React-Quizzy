import { useEffect, useState } from "react";
import "../layout/main-content/shared-style.scss";
import { apiKey } from "../../config/cooking-apiKey";
import Header from "../layout/header/header";
import RecipeCard from "../shared-components/recipe-cards/recipeCards";
import Card from "../shared-components/navigation-card/card";
import Button from "../../shared/button/button-component";
import parse from 'html-react-parser';
import TitleComponents from "../shared-components/titles-component/titles-component";
const Home = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [foodJoke, setFoodJoke] = useState('')
    useEffect(() => {
        // fetchRandomRecipes();
      fetchRandomFoodJoke();
    },[]);

  const fetchRandomRecipes = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`
    )
      .then((response) => response.json())
      .then((data) => {
        setRandomRecipes(data.recipes);
      });
  };
  const fetchRandomFoodJoke = async ()=>{
    await fetch(
      `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFoodJoke(data.text)
      });
  }
  const menuCards = [
    {
      title: "Discover",
      description:
        "Discover new recipes by selecting ingridients, nutritions or just by typing a keyword!",
      routerLink: "/discover",
    },
    {
      title: "Plan my menu",
      description:
        "Plan your menu for the day, for the week or for the rest of the year!",
      routerLink: "/menu-planner",
    },
    {
      title: "Create custom recipe",
      description: "Create your own  tasty recipes!",
      routerLink: "/custom-recipe",
    },
    {
      title: "Favorite recipes",
      description:
        "Check out your favorite recipes so you can cook them again!",
      routerLink: "/favorite-recipes",
    },
  ];
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-cards">
          {menuCards?.map((card, index) => {
            return (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                routerLink={card.routerLink}
              />
            );
          })}
        </div>
        <div>
            <h6>Random food joke: </h6>
          {parse(foodJoke)}
          </div>
          <TitleComponents title='Daily Recipes'/>
          <div className="button-container"> <Button onClick={fetchRandomRecipes} label='show recipes'></Button> </div>
          
        <div className="recipe-cards-container">
          {randomRecipes?.map((recipe, index) => {
            return <RecipeCard key={index} props={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
