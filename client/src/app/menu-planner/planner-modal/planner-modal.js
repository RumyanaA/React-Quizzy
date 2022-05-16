import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import "./planner-modal.scss";

const PlannerModal = ({ date, onClose }) => {
    const [isShowInput, setIsShowInput] = useState(false);
    const [indexInput, setIndexInput] = useState(0);

    const [meal, setMeal] = useState([
        { id: 1, text: 'Breakfast', isShow: false },
        { id: 2, text: 'Lunch', isShow: false },
        { id: 3, text: 'Dinner', isShow: false }
    ]);

    const toggle = (index) => {
        meal[index].isShow = !meal[index].isShow
        console.log(index)
        setMeal([...meal]);
    };

    const onEdit = (ind) => {
        if (indexInput === ind) {
            setIsShowInput(!isShowInput);
        } else {
            setIndexInput(ind);
        }
    }
    return (
        <>
            <div className="planner-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                    <div className="modal-body">
                        <h2 className="date">{date}</h2>
                        <div>
                            {meal.map((mealItem, index) =>
                                <div key={index} className="item">
                                    <div className="arrow-buttons-container" onClick={() => toggle(index)}>
                                        <button className="arrow-buttons" >
                                            {mealItem.isShow ? <FontAwesomeIcon className="arrow-icon" icon={faCaretUp} /> :
                                                <FontAwesomeIcon className="arrow-icon" icon={faCaretDown} />}
                                            {mealItem.text}
                                        </button>
                                        <h2>Title</h2>
                                    </div>

                                    {mealItem.isShow && <div className="recipe">
                                        <div className="input-buttons-container">
                                            {isShowInput && (indexInput === index) ? <input id={index}></input> : null}
                                            <span className="buttons-container">
                                                <button className="btn" onClick={() => onEdit(index)}>
                                                    <FontAwesomeIcon icon={faPen} />   </button>
                                                <button className="btn"><FontAwesomeIcon icon={faTrash} /></button>
                                            </span>
                                        </div>
                                        <p className="recipe-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum mi in massa mattis, eu sodales justo gravida. Sed eget sapien sodales, pretium turpis id, malesuada purus. Morbi molestie dui eget aliquet molestie. Integer pellentesque sit amet libero eget tristique. Ut sed leo non metus consequat egestas. Praesent eleifend diam et odio placerat ultricies. Nunc rutrum vehicula ex, a semper ante interdum cursus. Pellentesque vestibulum sapien a leo egestas faucibus.
                                            Phasellus eu massa sem. Phasellus et placerat eros. Aenean in lorem eu orci condimentum aliquam. Mauris volutpat lorem efficitur leo tincidunt tempus. Suspendisse quam ex, blandit eu orci vitae, auctor semper nisi. Aenean laoreet scelerisque orci, et porta erat pellentesque ut. Sed semper et elit vel pellentesque. In vulputate eros nec volutpat scelerisque. Integer feugiat enim libero, ut luctus felis tristique sed.
                                            Integer porttitor, elit ac blandit hendrerit, justo ante pellentesque erat, quis ullamcorper nisi ipsum a massa. Sed vitae arcu at leo congue venenatis. Aenean vel enim imperdiet urna egestas cursus. Proin et viverra velit, nec varius nibh. Mauris non aliquam quam, sit amet porta ante. Proin fermentum, mauris nec facilisis semper, quam purus venenatis nulla, sit amet laoreet arcu elit ut neque. Phasellus et scelerisque metus. Praesent ante erat, efficitur in elit vel, condimentum lobortis felis. Sed egestas dui id augue vulputate, sit amet vulputate odio luctus. Maecenas cursus dapibus dui eu vulputate. Curabitur egestas vitae elit a iaculis. In molestie volutpat egestas. Fusce massa sem, vulputate at est ut, aliquet auctor enim. Aenean accumsan quam erat, nec blandit libero lacinia eget. Phasellus vel eros et metus venenatis rutrum.
                                            Sed tincidunt aliquam lorem quis luctus. Fusce rhoncus ut mi sed fermentum. In felis nunc, tempus eu eros sit amet, vulputate ultricies metus. Pellentesque in ante vitae sapien condimentum cursus. Fusce dolor orci, pellentesque a semper ullamcorper, molestie at ante. Fusce euismod enim at tristique mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In venenatis in libero sed fringilla. Morbi at nulla vitae mauris mollis finibus. Nunc diam ex, commodo a blandit id, tincidunt euismod nisi. Cras mattis justo auctor, scelerisque elit non, euismod erat. Vestibulum felis arcu, dictum eget egestas id, vestibulum id nisl.</p>
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