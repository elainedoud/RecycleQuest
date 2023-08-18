import React, { useState } from 'react'
import Knowledge from './Knowledge'
import Gem from './Gem'
import './Map.css'
import './Gem.css'

function Map({user, userPoints, setUserPoints}) {
  console.log(userPoints)
  const initialGems = [
    { id: 1, top: 450, left: 500, text: 'Oliver Puddlebrook says: "Clean aluminum cans and rinsed glass bottles can always be recycled.', hidden: false },
    { id: 2, top: 1250, left: 490, text: 'Felix Whimsy says: "Paper, including junk mail, can almost always be recycled. The only exceptions are shredded paper or paper that is contaminated (ie. food waste)."', hidden: false },
    { id: 3, top: 1180, left: 2735, text: `Penelope Puzzle says: "Recycling guidelines and rules are often determined by local laws and ordinances, so it's important to familiarize yourself with local recycling regulations."`, hidden: false },
    { id: 4, top: 3520, left: 2245, text: `Amelia Starshine says: "Each ton of paper that is recycled saves seventeen trees."`, hidden: false },
    { id: 5, top: 3050, left: 480, text: 'Simon Feathers says: "When in doubt, do not recycle an item that you are unsure of.  This could contaminate the other items in the recycling bin."', hidden: false },

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