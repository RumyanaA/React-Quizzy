import React from 'react';
import './no-data-found-message-style.scss';

function NoDataFoundMsg({ message }) {
  return (
    <div className="message-container">
      No
      {' '}
      {message}
      {' '}
      Found
    </div>
  );
}
export default NoDataFoundMsg;
