/* eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "function", next: "function" }
] */
import { React, useState } from 'react';
// eslint-disable-next-line import/named
import { apiKey } from '../../../config/cooking-apiKey';
import CustomRecipeModal from '../CustomModal/customRecipeModal';

function SearchedRecipeCard({ props }) {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchRecipe = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/${props.id}/information?apiKey=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentRecipe(data);
      });
  };
  const handleClick = async () => {
    await fetchRecipe();
    handleShow();
  };

  return (
    <>
      <div onClick={handleClick} className="recipe-wrapper">
        <img className="recipe-img" alt="recipe" src={props.image} />
        <div className="recipe-title">
          {' '}
          {props.title}
          <span className="recipe-tooltip">{props.title}</span>
        </div>
      </div>
      {show && <CustomRecipeModal show={show} recipe={currentRecipe} handleClose={handleClose} />}
    </>
  );
}

export default SearchedRecipeCard;
