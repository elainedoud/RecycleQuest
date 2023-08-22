import React, { useContext, useEffect, useState } from 'react'
import './PointsTab.css'
import UserContext from '../../Context/UserContext'

const PointsTab = () => {
  const { userPoints } = useContext(UserContext)
  const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />
  
  // State to force a re-render
  const [forceRender, setForceRender] = useState(false)

  // Use useEffect to listen for changes to userPoints and trigger a re-render
  useEffect(() => {
    // Toggle the forceRender state to trigger a re-render
    setForceRender(prevState => !prevState)
  }, [userPoints])

  return (
    <div className="points-tab">
      <span> {userPoints} {gem}</span>
    </div>
  )
}

export default PointsTab