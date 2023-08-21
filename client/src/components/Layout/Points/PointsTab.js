import React from 'react'
import './PointsTab.css'

const PointsTab = ({userPoints }) => {
  const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />
  return (
    <div className="points-tab">
      <span> {userPoints}  {gem}</span>
    </div>
  )
}

export default PointsTab