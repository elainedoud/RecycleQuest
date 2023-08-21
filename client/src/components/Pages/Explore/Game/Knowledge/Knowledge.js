import React from 'react';
import './Knowledge.css';

function Knowledge({ text, onClose }) {
  return (
    <div className="knowledge-container">
      <p className="knowledge-text">{text}</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default Knowledge;