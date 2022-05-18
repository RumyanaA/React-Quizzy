/* eslint-disable no-param-reassign */
import { React, useEffect, useState } from 'react';
import './recipe-Cards-style.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import parse from 'html-react-parser';

function RecipeCard({ props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    // api array has repeated ingridients
    const ingridients = props.extendedIngredients;
    const uniqueIngridients = [
      ...new Map(ingridients.map((item) => [item.id, item])).values(),
    ];
    props.extendedIngredients = uniqueIngridients;
  });
  const altText = 'recipe';
  return (
    <>
      <div onClick={handleShow} className="recipe-wrapper">

        <img
          className="recipe-img"
          alt={altText.toString()}
          src={props.image}
        />
        <div className="recipe-title">
          {' '}
          {props.title}
          <span className="recipe-tooltip">{props.title}</span>
        </div>
        <p>
          {props.extendedIngredients.length}
          {' '}
          Ingredients |
          {' '}
          {props.readyInMinutes}
          {' '}
          min
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
          <img
            className="recipe-img-modal"
            alt={altText.toString()}
            src={props.image}
          />
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="modal-paragraph">Ingredients: </p>
            <div className="ingridients">
              {props.extendedIngredients?.map((ingridient, index) => (
                <div className="ingridient-div" key={index}>
                  {' '}
                  &#9670;
                  {ingridient.original}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="modal-paragraph">Directions:</p>
            {parse(props.instructions)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecipeCard;
