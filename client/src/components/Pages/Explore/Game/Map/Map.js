import React, { useState, useContext } from 'react'
import Knowledge from '../Knowledge/Knowledge'
import Gem from '../Gem/Gem'
import Countdown from '../../../Home/Countdown'
import './Map.css'
import UserContext from '../../../../Context/UserContext'

function Map({ gems, collectedCount, incrementCollected, collectedKnowledge, setCollectedKnowledge }) {
  const { userPoints, setUserPoints } = useContext(UserContext)
  const [nextBonusTime, setNextBonusTime] = useState(new Date().getTime() + 24 * 60 * 60 * 1000)
  const [selectedGem, setSelectedGem] = useState(null)

  const openKnowledge = (gem) => {
    setSelectedGem(gem)
  }

  const closeKnowledge = () => {
    if (selectedGem) {
      const updatedGems = gems.map((gem) => {
        if (gem.id === selectedGem.id) {
          const newPoints = userPoints + 100
          setUserPoints(newPoints)
          const updatedCollectedKnowledge = [...collectedKnowledge, selectedGem.knowledge_blurb]
          incrementCollected(collectedCount + 1)
          setCollectedKnowledge(updatedCollectedKnowledge)
          return { ...gem, hidden: true }
        }
        return gem
      })

      setSelectedGem(null)
    }
  }

  return (
    <div className="map-container">
      <div className="background-image"></div>
      
      <div className="countdown">
        <Countdown timeRemaining={nextBonusTime - new Date().getTime()} />
      </div>
      <div className="gems">
        {gems.map((gem) => (
          <Gem
            key={gem.id}
            gem={gem}
            hidden={gem.hidden}
            onClick={() => openKnowledge(gem)}
          />
        ))}
      </div>
      {selectedGem && (
        <Knowledge text={selectedGem.knowledge_blurb} onClose={closeKnowledge} userPoints={userPoints} setUserPoints={setUserPoints} />
      )}
      {collectedCount === gems.length && (
        <div className="collected-knowledge">
          <p>Collected Knowledge:</p>
          <ul>
            {collectedKnowledge.map((knowledge, index) => (
              <li key={index}>{knowledge}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Map