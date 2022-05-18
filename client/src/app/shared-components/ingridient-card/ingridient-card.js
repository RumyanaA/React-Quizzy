import React from 'react';
import './ingridient-card-style.scss';

function IngridientCard({

  props, addIngridient, removeIngridient, selectedIngridient,
}) {
  return (
    <div
      className="ingridient-info"
      onClick={!selectedIngridient ? () => addIngridient(props) : null}
    >
      {selectedIngridient ? <div onClick={() => removeIngridient(props)}>x</div> : null}
      <img
        className="ingridient-img"
        alt={props.name}
        src={`https://spoonacular.com/cdn/ingredients_100x100/${props.image}`}
      />
      <h6 className="item-name">{props.name}</h6>
    </div>
  );
}
export default IngridientCard;
