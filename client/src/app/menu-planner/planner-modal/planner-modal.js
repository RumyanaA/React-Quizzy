import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import "./planner-modal.scss";

const PlannerModal = ({
  dateToShow,
  onClose,
  menu,
  events,
  setEvents,
  date
}) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [indexInput, setIndexInput] = useState(0);
  const [dailyMenu, setDailyMenu] = useState(menu);
  const [meal, setMeal] = useState([
    { id: 1, text: 'breakfast', isShow: false },
    { id: 2, text: 'lunch', isShow: false },
    { id: 3, text: 'dinner', isShow: false }
  ]);
  function debounce(fn, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(context, args), delay);

    };
  }
  const toggle = (index) => {
    meal[index].isShow = !meal[index].isShow
    setMeal([...meal]);
  };

  const onEdit = (ind) => {

    if (indexInput === ind) {
      setIsShowInput(!isShowInput);
    } else {
      setIndexInput(ind);
    }
  }
  const onChange = debounce((value, mealItem) => {

    //get recipe from api
    let meal = menu[mealItem.text];
    meal.title = value;
    meal.details = "New details";
    setDailyMenu(meal);

    let selectedDayEvents = events.find(e => e.date === date && e.title.startsWith(mealItem.text));
    let newTitle = `${mealItem.text}: ${value}`;

    if (!selectedDayEvents) {
      selectedDayEvents = {
        title: '',
        date: ''
      }
      selectedDayEvents.date = date;
    }
    selectedDayEvents.title = newTitle;
    setEvents(prevEvents => [...prevEvents, selectedDayEvents]);
  }, 1000);


  const onDelete = (mealItem) => {
    let meal = menu[mealItem.text];
    meal.title = '';
    meal.details = '';
    setDailyMenu(meal);


  }
  return (
    <>
      <div className="planner-modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={onClose}>&times;</span>
          </div>
          <div className="modal-body">
            <h2 className="date">{dateToShow}</h2>
            <div>
              {meal.map((mealItem, index) =>
                <div key={index} className="item">
                  <div className="arrow-buttons-container" onClick={() => toggle(index)}>
                    <button className="arrow-buttons" >
                      {mealItem.isShow ? <FontAwesomeIcon className="arrow-icon" icon={faCaretUp} /> :
                        <FontAwesomeIcon className="arrow-icon" icon={faCaretDown} />}
                      {mealItem.text.charAt(0).toUpperCase() + mealItem.text.slice(1)}
                    </button>
                    {menu[mealItem.text].title &&
                      <h2 className="title" key={index}>{menu[mealItem.text].title}</h2>
                    }
                  </div>

                  {mealItem.isShow && <div className="recipe">
                    <div className="input-buttons-container">
                      {isShowInput && (indexInput === index) ? <input onChange={(e) => onChange(e.target.value, mealItem)} id={index}></input> : null}
                      <span className="buttons-container">
                        <button className="btn" onClick={() => onEdit(index)}>
                          {isShowInput && (indexInput === index) ? <FontAwesomeIcon icon={faPlus} /> :
                            <FontAwesomeIcon icon={faPen} />} </button>
                        <button className="btn" onClick={() => onDelete(mealItem)}>
                          <FontAwesomeIcon icon={faTrash} /></button>
                      </span>
                    </div>
                    {menu[mealItem.text].title &&
                      <p className="recipe-details">{menu[mealItem.text].details}</p>}
                  </div>}
                </div>)}
            </div>
          </div>

        </div>
      </div>
    </>
  );

}
export default PlannerModal;
