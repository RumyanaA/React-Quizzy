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
  const onChange = (value, text) => {
    // get recipe from api
    const selectedMeal = menu[text];
    selectedMeal.title = value;
    selectedMeal.details = 'New details';
    setDailyMenu(selectedMeal);

    let selectedDayEvents = events.find(
      (e) => e.date === date && e.title.startsWith(text),
    );
    const newTitle = `${text}: ${value}`;

    if (!selectedDayEvents) {
      selectedDayEvents = {
        title: '',
        date: '',
      };
      selectedDayEvents.date = date;
    }
    selectedDayEvents.title = newTitle;
    setEvents((prevEvents) => [...prevEvents, selectedDayEvents]);
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
            {meal.map(({ text, isShow }, index) => (
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
                      {isShowInput && indexInput === index ? (
                        <input
                          onChange={(e) => onChange(e.target.value, text)}
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
