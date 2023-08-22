import React, { useEffect, useState, useContext } from 'react'
import Knowledge from '../Knowledge/Knowledge'
import Gem from '../Gem/Gem'
import './Map.css'
import UserContext from "../../../../Context/UserContext"

function Map() {
  const { user, userPoints, setUserPoints } = useContext(UserContext)
  const [gems, setGems] = useState([]) // Initialize with an empty array

  useEffect(() => {
    fetch('/allknowledge')
      .then(r => r.json())
      .then(data => setGems(data)) // Update the gems state with fetched data
  }, []) // Empty dependency array to ensure the effect runs only once

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
          return { ...gem, hidden: true }
        }
        return gem
      })
      setGems(updatedGems)
      setSelectedGem(null)
    }
  }

  return (
    <div className="map-container">
      <div className="background-image"></div>
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
    </div>
  )
}

export default Map