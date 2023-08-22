import React, { useState, useEffect } from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import './Explore.css'
import Map from '../Explore/Game/Map/Map'
import Info from '../../Layout/Info/Info'

function Explore() {
  const [gems, setGems] = useState([])
  const [collectedCount, setCollectedCount] = useState(0)
  const [collectedKnowledge, setCollectedKnowledge] = useState([])

  useEffect(() => {
    fetch('/allknowledge')
      .then(r => r.json())
      .then(data => setGems(data))
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
        <Info text={"Gem's are the secret to knowledge! Click around and learn about Recycling, earn points, and even get insights into tomorrow's question of the day!"}/>
      </div>
      {/* <MapInteractionCSS> */}
      <Map gems={gems} collectedCount={collectedCount} incrementCollected={incrementCollected} collectedKnowledge={collectedKnowledge} setCollectedKnowledge={setCollectedKnowledge}/><br/><br/><br/><br/>
      {/* </MapInteractionCSS> */}
    </>
  )
}

export default Explore