import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCaretDown,
  faCaretUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './planner-modal.scss';

function PlannerModal({
  dateToShow, onClose, menu, events, setEvents, date,
}) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [indexInput, setIndexInput] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [dailyMenu, setDailyMenu] = useState(menu);
  const [meal, setMeal] = useState([
    { id: 1, text: 'breakfast', isShow: false },
    { id: 2, text: 'lunch', isShow: false },
    { id: 3, text: 'dinner', isShow: false },
  ]);
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      const context = this;
      // const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(context, args), delay);
    };
  }
  const toggle = (index) => {
    meal[index].isShow = !meal[index].isShow;
    setMeal([...meal]);
  };

  const onEdit = (ind) => {
    if (indexInput === ind) {
      setIsShowInput(!isShowInput);
    } else {
      setIndexInput(ind);
    }
  };
  const onChange = debounce((value, mealItem) => {
    // get recipe from api
    const selectedMeal = menu[mealItem.text];
    selectedMeal.title = value;
    selectedMeal.details = 'New details';
    setDailyMenu(selectedMeal);

    let selectedDayEvents = events.find(
      (e) => e.date === date && e.title.startsWith(mealItem.text),
    );
    const newTitle = `${mealItem.text}: ${value}`;

    if (!selectedDayEvents) {
      selectedDayEvents = {
        title: '',
        date: '',
      };
      selectedDayEvents.date = date;
    }
    selectedDayEvents.title = newTitle;
    setEvents((prevEvents) => [...prevEvents, selectedDayEvents]);
  }, 1000);

  const onDelete = (mealItem) => {
    const selectedMeal = menu[mealItem.text];
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
            {meal.map((mealItem, index) => (
              <div key={index} className="item">
                <div
                  className="arrow-buttons-container"
                  onClick={() => toggle(index)}
                >
                  <button className="arrow-buttons">
                    {mealItem.isShow ? (
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
                    {mealItem.text.charAt(0).toUpperCase()
                      + mealItem.text.slice(1)}
                  </button>
                  {menu[mealItem.text].title && (
                    <h2 className="title" key={index}>
                      {menu[mealItem.text].title}
                    </h2>
                  )}
                </div>

                {mealItem.isShow && (
                  <div className="recipe">
                    <div className="input-buttons-container">
                      {isShowInput && indexInput === index ? (
                        <input
                          onChange={(e) => onChange(e.target.value, mealItem)}
                          id={index}
                        />
                      ) : null}
                      <span className="buttons-container">
                        <button className="btn" onClick={() => onEdit(index)}>
                          {isShowInput && indexInput === index ? (
                            <FontAwesomeIcon icon={faPlus} />
                          ) : (
                            <FontAwesomeIcon icon={faPen} />
                          )}
                          {' '}
                        </button>
                        <button
                          className="btn"
                          onClick={() => onDelete(mealItem)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </span>
                    </div>
                    {menu[mealItem.text].title && (
                      <p className="recipe-details">
                        {menu[mealItem.text].details}
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
