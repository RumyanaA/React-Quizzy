import React from 'react';
import './NoDataFoundMessage.scss';

function NoDataFoundMessage({ testid, message }) {
  return (
    <div data-testid={testid} className="message-container">
      {message}
    </div>
  );
}
export default NoDataFoundMessage;
