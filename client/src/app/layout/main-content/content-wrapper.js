import Header from "../header/header";
import Card from "../../shared-components/navigation-card/card";
import "./content-wrapper-style.scss";
import RecipeCard from "../../shared-components/recipe-cards/recipeCards";

const Wrapper = ({ menuCards, recipes }) => {
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
        <h5 className="daily-recipes">Daily Recipes</h5>
        <div className="recipe-cards-container">
          {recipes?.map((recipe, index) => {
            return <RecipeCard key={index} props={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Wrapper;
