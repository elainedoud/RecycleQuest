import React from 'react'
import './Knowledge.css'

function Knowledge({ knowledge, character, onClose }) {
  return (
    <div className="knowledge-container">
      <p className="knowledge-text"> {character} says, "{knowledge}"</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  )
}

export default Knowledge