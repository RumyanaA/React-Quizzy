import React from 'react';
import './titles-component-style.scss';

function TitleComponents({ title }) {
  return (
    <div className="all-ingridients-title">
      <div className="all-ingridients-left-line" />
      {title}
      {' '}
      <div className="all-ingridients-right-line" />
    </div>
  );
}
export default TitleComponents;
