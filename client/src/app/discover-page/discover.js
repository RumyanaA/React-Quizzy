import Wrapper from "../layout/main-content/content-wrapper";
import './discover-style.scss'

const Discover = () => {
  const menuCards = [
    {
      title: "What's in my fridge ",
      description:
        "Check off the ingredients that you have to find recipes you can make.",
      routerLink: "/my-fridge-food",
    },
    {
      title: "The real food dietitians",
      description:
        "Find a set of recipes that adhere to the given nutritional limits. You may set limits for macronutrients (calories, protein, fat, and carbohydrate).",
      routerLink: "/nutritions",
    },
  ];
  return (
    <div>
      <Wrapper menuCards={menuCards} />
    </div>
  );
};

export default Discover;
