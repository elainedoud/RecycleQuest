import React, { useState, useEffect, useContext } from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import './Explore.css'
import Map from '../Explore/Game/Map/Map'
import Info from '../../Layout/Info/Info'
import UserContext from '../../Context/UserContext'
import Countdown from '../Home/Countdown'

function Explore() {
  const [gems, setGems] = useState([])
  const [collectedCount, setCollectedCount] = useState(0)
  const [collectedKnowledge, setCollectedKnowledge] = useState([])
  const { user, lastDailyGems, setLastDailyGems } = useContext(UserContext)
  
  let lastDailyTime = Date.parse(user.last_gem_bonus)
  const now = new Date()
  const timeSinceLastDailyGem = now - lastDailyTime
  const canShowMap = timeSinceLastDailyGem > 24 * 60 * 60 * 1000
  const timeRemaining = canShowMap ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastDailyGem

  // console.log("last daily: " + lastDailyGems)
  // console.log("now: " + now)
  // console.log("time since last daily: " + timeSinceLastDailyGem)
  // console.log("can show map: " + canShowMap)
  // console.log("time remaining: " + timeRemaining)

  useEffect(() => {
    fetch('/allknowledge')
      .then(r => r.json())
      .then(data => setGems(data)) // make gems for each knowledge blurb
  }, [])

  const incrementCollected = () => {
    setCollectedCount(prevCollected => prevCollected + 1)
  }

  return (
    <>
      <div>
        <div className="gem-counter">
          Gems Collected: {collectedCount} / {gems.length}
        </div>
        <Info
          text={
            "Gems are the secret to knowledge! Click around and learn about Recycling, earn points, and even get insights into tomorrow's question of the day!"
          }
        />
      </div>

      {collectedCount === gems.length ? (
        <div className="knowledge-container">
          <p>Recap of Collected Knowledge:</p>
          <div>
            {collectedKnowledge.map((knowledge, index) => (
              <div key={index} className="knowledge-row">{knowledge}</div>
            ))}
          </div>
        </div>
      ) : (
        <Map
          gems={gems}
          collectedCount={collectedCount}
          incrementCollected={incrementCollected}
          collectedKnowledge={collectedKnowledge}
          setCollectedKnowledge={setCollectedKnowledge}
        />
      )}
    </>
  )
}

export default Explore