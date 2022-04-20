import { useEffect, useState } from "react";
import Wrapper from "../layout/main-content/content-wrapper-depricated";
import { apiKey } from "../../config/cooking-apiKey";
import Header from "../layout/header/header";
import RecipeCard from "../shared-components/recipe-cards/recipeCards";
import Card from "../shared-components/navigation-card/card";
const Home = () => {
    const [randomRecipes, setRandomRecipes]=useState([]);
//   useEffect(() => {
//       fetchRandomRecipes();
      
//   },[]);

  const fetchRandomRecipes = async () =>{
     await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`
    )
    .then(response=>response.json())
    .then((data) =>{
        setRandomRecipes(data.recipes)
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
      < Header />
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
            
            <h5 className="daily-recipes">Daily Recipes</h5>
            <button onClick={fetchRandomRecipes}>show recipes</button>
          </div>
      <div className="recipe-cards-container">
            {randomRecipes?.map((recipe, index) => {
              return <RecipeCard key={index} props={recipe} />;
            })}
          </div>
      </div>
      {/* <Wrapper menuCards={menuCards} recipes={randomRecipes} /> */}
      
    </div>
  );
};

export default Home;
