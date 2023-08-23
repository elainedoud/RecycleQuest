import React, { useState, useEffect, useContext } from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import './Explore.css'
import Map from '../Explore/Game/Map/Map'
import Info from '../../Layout/Info/Info'
import UserContext from '../../Context/UserContext'
import Countdown from '../Home/Countdown'

function Explore() {
  const { user, lastDailyGems, setLastDailyGems, gemsCollected, setGemsCollected, collectedKnowledge, setCollectedKnowledge } = useContext(UserContext)
  
  const [gems, setGems] = useState([])
  const [collectedCount, setCollectedCount] = useState(0)
  let lastDailyTime = Date.parse(lastDailyGems)
  const now = new Date()
  const timeSinceLastDailyGem = now - lastDailyTime
  const canShowMap = timeSinceLastDailyGem > 24 * 60 * 60 * 1000
  const timeRemaining = canShowMap ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastDailyGem

  console.log(collectedKnowledge )

  useEffect(() => {
    fetch('/allknowledge')
      .then(r => r.json())
      .then(data => setGems(data))
  }, [])

  useEffect(() => {
    if (collectedCount === gems.length - 1) {
      // const newCollectedKnowledge = gems.map(gem => gem.knowledge)
      // setCollectedKnowledge(newCollectedKnowledge)
      setGemsCollected(true)
    }
  }, [collectedCount, gems])
  
  const incrementCollected = () => {
    setCollectedCount(prevCollected => prevCollected + 1)
  }


  return (
    <>
    <div>
      <Info
    text={
      "Gems are the secret to knowledge! Click around and learn about Recycling, earn points, and even get insights into tomorrow's question of the day!"
    }
  />
      
        <div className="gem-counter">
          {!gemsCollected ? <p>GEMS COLLECTED: {collectedCount} / {gems.length -1}</p> : <p>All Gems Collected</p>}
        </div>
        
      </div>

      {gemsCollected ? (
        <div className="knowledge-container">
          <p>Recap of Collected Knowledge:</p>
          <div>
            {collectedKnowledge.map((knowledge, index) => (
              <div key={index} className="knowledge-row">{knowledge}</div>
            ))}
          </div> <br/>
         
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