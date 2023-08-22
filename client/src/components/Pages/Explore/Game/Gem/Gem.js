import React, { useState } from 'react'
import './Gem.css'

function Gem({ gem, onClick, hidden }) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    onClick(gem)
    setClicked(true)
  }

  return (
    <div
      className={`gem ${hidden || clicked ? 'hidden' : ''}`}
      style={{ top: `${gem.y}%`, left: `${gem.x}%` }}
      onClick={handleClick}
    >
      {/* div below gem to glow since gem is not a square object */}
      <div className="glow" />
      <img
        src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361"
        className="gem-image"
        alt="gem"
      />
    </div>
  )
}

export default Gem