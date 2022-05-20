import React, { useState, useEffect } from 'react';
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
  dateToShow, onClose, menu,
}) {
  const [show, setShow] = useState(false);
  const [indexInput, setIndexInput] = useState(0);
  const [singleMeal, setSingleMeal] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [dailyMenu, setDailyMenu] = useState(menu);
  const [meals, setMeals] = useState([
    { id: 1, text: 'breakfast', isShow: false },
    { id: 2, text: 'lunch', isShow: false },
    { id: 3, text: 'dinner', isShow: false },
  ]);
  const [deletedIds, setDeletedId] = useState([]);

  useEffect(() => {
    if (!singleMeal) {
      return;
    }
    const currentDailyMenu = dailyMenu;
    currentDailyMenu[singleMeal] = selectedRecipe;
    setDailyMenu({ ...currentDailyMenu });
  }, [selectedRecipe]);
  const sendData = (data) => {
    setSelectedRecipe(data);
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
    const selectedMeal = dailyMenu;
    const { id } = selectedMeal[text];
    deletedIds.push(id);
    setDeletedId([...deletedIds]);
    selectedMeal[text] = {};
    setDailyMenu({ ...selectedMeal });
  };
  return (
    <div className="planner-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => onClose(dailyMenu, deletedIds)}>
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
                  {dailyMenu[text].title && (
                    <h3 className="recipe-title" key={index}>
                      {dailyMenu[text].title}
                    </h3>
                  )}
                </div>

                {isShow && (
                  <div className="recipe">
                    <div className="input-buttons-container">
                      {show && indexInput === index ? (
                        <RecipeSearchAndSelect
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
                    {dailyMenu[text].title && (
                      <p className="recipe-details">
                        {dailyMenu[text].id}
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
