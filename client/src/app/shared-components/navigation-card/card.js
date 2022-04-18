import { useNavigate } from "react-router-dom";
import "./card-style.scss"
const Card = ({ title, description, routerLink }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routerLink);
  }
  return (
    <div className="card" onClick={handleClick}>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default Card;
