import React from 'react'

const PointsTab = ({user,  userPoints }) => {
  return (
    <div className="points-tab">
      <span>Points: {userPoints}</span>
    </div>
  )
}

export default PointsTab