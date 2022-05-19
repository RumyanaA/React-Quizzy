import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import './planner-modal.scss';
import RecipeSearchAndSelect from '../../shared-components/recipe-search-and-select/recipe-search-and-select';

function PlannerModal({
  // eslint-disable-next-line no-unused-vars
  dateToShow, onClose, menu, events, setEvents,
}) {
  const [show, setShow] = useState(false);
  const [indexInput, setIndexInput] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [singleMeal, setSingleMeal] = useState();
  const [dailyMenu, setDailyMenu] = useState(menu);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [meals, setMeals] = useState([
    { id: 1, text: 'breakfast', isShow: false },
    { id: 2, text: 'lunch', isShow: false },
    { id: 3, text: 'dinner', isShow: false },
  ]);

  // useEffect(() => {
  // }, dailyMenu);
  const sendData = (data) => {
    setSelectedRecipes([...data]);
  };

  const toggle = (index) => {
    meals[index].isShow = !meals[index].isShow;
    setMeals([...meals]);
  };

  const onEdit = (ind, meal) => {
    setSingleMeal(meal);
    if (indexInput === ind) {
      setShow(!show);
    } else {
      setIndexInput(ind);
    }
  };
  const onDelete = (text) => {
    const selectedMeal = menu[text];
    selectedMeal.title = '';
    selectedMeal.details = '';
    setDailyMenu(selectedMeal);
  };
  return (
    <div className="planner-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <h2 className="date">{dateToShow}</h2>
          <div>
            {meals.map(({ text, isShow }, index) => (
              <div key={index} className="item">
                <div
                  className="arrow-buttons-container"
                  onClick={() => toggle(index)}
                >
                  <button className="arrow-buttons">
                    {isShow ? (
                      <FontAwesomeIcon
                        className="arrow-icon"
                        icon={faCaretUp}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="arrow-icon"
                        icon={faCaretDown}
                      />
                    )}
                    {text.charAt(0).toUpperCase()
                      + text.slice(1)}
                  </button>
                  {menu[text].title && (
                    <h2 className="title" key={index}>
                      {menu[text].title}
                    </h2>
                  )}
                </div>

                {isShow && (
                  <div className="recipe">
                    <div className="input-buttons-container">
                      {show && indexInput === index ? (
                        <RecipeSearchAndSelect
                          selectedRecipes={selectedRecipes}
                          events={events}
                          currMenu={dailyMenu}
                          meal={text}
                          sendData={sendData}
                        />
                      ) : null}
                      <span className="buttons-container">
                        <button className="btn" onClick={() => onEdit(index, text)}>
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          className="btn"
                          onClick={() => onDelete(text)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </span>
                    </div>
                    {menu[text].title && (
                      <p className="recipe-details">
                        {menu[text].details}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlannerModal;
