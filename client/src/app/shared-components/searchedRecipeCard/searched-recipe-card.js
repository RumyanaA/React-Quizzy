import { useState } from "react";
import { apiKey } from "../../../config/cooking-apiKey";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import parse from "html-react-parser";

const SearchedRecipeCard = ({ props }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    await fetchRecipe();
    handleShow();
  };
  const fetchRecipe = async () => {
    await fetch(
      `https://api.spoonacular.com/recipes/${props.id}/information?apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentRecipe(data);
      });
  };
  return (
    <>
      <div onClick={handleClick} className="recipe-wrapper">
        <img className="recipe-img" alt={"recipe"} src={props.image}></img>
        <h5 className="recipe-title">{props.title}</h5>
      </div>
      {show?<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRecipe?.title}</Modal.Title>
          <img className="recipe-img-modal" alt={"recipe"} src={currentRecipe?.image} />
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="modal-paragraph">Ingredients: </p>
            <div className="ingridients">
              {currentRecipe?.extendedIngredients?.map((ingridient, index) => (
                <div className="ingridient-div" key={index}>
                  {" "}
                  &#9670; {ingridient.original}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="modal-paragraph">Directions:</p>
            {parse(currentRecipe?.instructions)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>:null}
    </>
  );
};

export default SearchedRecipeCard;
