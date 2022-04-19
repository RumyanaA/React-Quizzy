const SearchedRecipeCard = ({ props }) => {
  return (
    <div className="recipe-wrapper">
      <img className="recipe-img" alt={"recipe"} src={props.image}></img>
      <h5 className="recipe-title">{props.title}</h5>
    </div>
  );
};

export default SearchedRecipeCard;
