import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './recipe-Cards-style.scss'
const RecipeCard = ({props}) => {
  const navigate = useNavigate();
  useEffect(()=>{
      console.log(props)
  })
  const altText='recipe';
  return (
    <div className="recipe-wrapper">
        <img className="recipe-img" alt={altText.toString()} src={props.image}/>
        <p className="recipe-title">{props.title}</p>
        <p>{props.extendedIngredients.length} Ingredients | {props.readyInMinutes} min</p>
    </div>
  );
};

export default RecipeCard;