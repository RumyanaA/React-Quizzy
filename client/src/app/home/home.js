import { useEffect, useState } from "react";
import Wrapper from "../layout/main-content/content-wrapper";
import { apiKey } from "../../config/cooking-apiKey";
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
      <Wrapper menuCards={menuCards} recipes={randomRecipes} />
      <button onClick={fetchRandomRecipes}>show recipes</button>
    </div>
  );
};

export default Home;
