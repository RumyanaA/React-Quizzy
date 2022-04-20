import './ingridient-card-style.scss';
const IngridientCard = ({ props, addIngridient, removeIngridient, selectedIngridient }) => {
  return (
    <div
      className="ingridient-info"
      onClick={!selectedIngridient? () => addIngridient(props) : null}
    >
       {selectedIngridient?<div onClick={() => removeIngridient(props)}>x</div>:null}
      <img
        className="ingridient-img"
        alt={props.name}
        src={`https://spoonacular.com/cdn/ingredients_100x100/${props.image}`}
      ></img>
      <h6 className="item-name">{props.name}</h6>
    </div>
  );
};
export default IngridientCard;
