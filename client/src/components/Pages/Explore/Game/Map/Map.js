import React, { useState } from 'react'
import Knowledge from '../Knowledge/Knowledge'
import Gem from '../Gem/Gem'
import './Map.css'

function Map({user, userPoints, setUserPoints}) {
  console.log(userPoints)
  const initialGems = [
    { id: 1, top: 260, left: 250, text: 'Oliver Puddlebrook says: "Clean aluminum cans and rinsed glass bottles can always be recycled.', hidden: false },
    { id: 2, top: 770, left: 315, text: 'Felix Whimsy says: "Paper, including junk mail, can almost always be recycled. The only exceptions are shredded paper or paper that is contaminated (ie. food waste)."', hidden: false },
    { id: 3, top: 720, left: 1800, text: `Penelope Puzzle says: "Recycling guidelines and rules are often determined by local laws and ordinances, so it's important to familiarize yourself with local recycling regulations."`, hidden: false },
    { id: 4, top: 2055, left: 1480, text: `Amelia Starshine says: "Each ton of paper that is recycled saves seventeen trees."`, hidden: false },
    { id: 5, top: 1800, left: 300, text: 'Simon Feathers says: "When in doubt, do not recycle an item that you are unsure of.  This could contaminate the other items in the recycling bin."', hidden: false },

  ]

  const [gems, setGems] = useState(initialGems)
  const [selectedGem, setSelectedGem] = useState(null)

  const openKnowledge = (gem) => {
    setSelectedGem(gem)
  }

  const closeKnowledge = () => {
    if (selectedGem) {
      const updatedGems = gems.map((gem) => {
        if (gem.id === selectedGem.id) {
          //value of gems tbd
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
        <Knowledge text={selectedGem.text} onClose={closeKnowledge} userPoints={userPoints} setUserPoints={setUserPoints} />
      )}
    </div>
  )
}

export default Map