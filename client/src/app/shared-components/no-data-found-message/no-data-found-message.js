import React from 'react';
import './no-data-found-message-style.scss';

function NoDataFoundMsg({ testid, message }) {
  return (
    <div data-testid={testid} className="message-container">
      {message}
    </div>
  );
}
export default NoDataFoundMsg;
