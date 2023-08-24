import React, { useContext, useEffect, useState } from "react"
import "./Redeem.css"
import UserContext from "../../Context/UserContext"
import RecyclingHistory from "./Recycling History/RecyclingHistory"
import Info from "../../Layout/Info/Info"

function Redeem() {
  const [count, setCount] = useState(0)
  const [todaysRecycled, setTodaysRecycled] = useState()
  const { user, setRecyclingHistory, recyclingHistory, updatePoints } = useContext(UserContext)
  const [addPopup, setAddPopup] = useState(false)
  const [recentlyAddedEntry, setRecentlyAddedEntry] = useState(null)
  const [today, setToday] = useState(new Date()) 
 
  useEffect(() => {
    fetch(`/userlogs?id=${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        const consolidatedEntries = {}

        data.forEach((entry) => {
          const entryDate = new Date(entry.date).toISOString().slice(0, 10)
          if (!consolidatedEntries[entryDate]) {
            consolidatedEntries[entryDate] = entry.amount
          } else {
            consolidatedEntries[entryDate] += entry.amount
          }
        })

        const combinedEntries = Object.keys(consolidatedEntries).map((date) => {
          return { date, amount: consolidatedEntries[date] }
        })

        // Sort the combinedEntries by date in descending order
        const sortedEntries = combinedEntries.sort((a, b) => new Date(b.date) - new Date(a.date))

        setRecyclingHistory(sortedEntries)

        // Find the most recently added entry
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        if (sortedData.length > 0) {
          setRecentlyAddedEntry(sortedData[0])
        }
      })
  }, [user.id])

  // Calculate highest deposit
const highestDeposit = recyclingHistory.length > 0
? recyclingHistory.reduce((highest, entry) => {
    return entry.amount > highest.amount ? entry : highest
  }, { amount: 0 })
: { amount: 0 }

// Calculate year-to-date total
const currentYear = today.getFullYear()
const yearToDateTotal = recyclingHistory.reduce((total, entry) => {
const entryDate = new Date(entry.date)
if (entryDate.getFullYear() === currentYear) {
  return total + entry.amount
}
return total
}, 0)

  const handlePopup = () => {
    setAddPopup(!addPopup)
  }

  const handleCountChange = (increment) => {
    if (count + increment >= 0) {
      setCount((prevCount) => prevCount + increment)
    }
  }

  const handleSubmit = () => {
    const currentDate = new Date().toISOString().slice(0, 10)
    const existingEntryIndex = recyclingHistory.findIndex(
      (entry) => entry.date === currentDate
    )
    const newRecycle = { date: currentDate, amount: count }

    fetch(`/newlog?id=${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecycle),
    })
      .then((response) => response.json())
      .then(data => {
        console.log('New recycle entry added:', data)
      
        const updatedHistory = [...recyclingHistory, data] // Add the new entry to the history
      
        // Consolidate entries for the same date
        const consolidatedEntries = {}
        updatedHistory.forEach((entry) => {
          const entryDate = new Date(entry.date).toISOString().slice(0, 10)
          if (!consolidatedEntries[entryDate]) {
            consolidatedEntries[entryDate] = entry.amount
          } else {
            consolidatedEntries[entryDate] += entry.amount
          }
        })
      
        // Convert consolidated entries back to an array and sort it
        const sortedHistory = Object.keys(consolidatedEntries).map((date) => {
          return { date, amount: consolidatedEntries[date] }
        }).sort((a, b) => new Date(b.date) - new Date(a.date))
      
        setRecyclingHistory(sortedHistory) // Update the state
      
        setCount(0)
        setRecentlyAddedEntry(data)
      })
      .catch(error => {
        console.error('Error adding recycle entry:', error)
      })
  }


  return (
    <>
      <Info text="Here you can redeem your recyclings for points! New updates include integration with local recycling facilities and direct receipt of recycling refunds!" /> <br />
      <div className="recyclopoints">

        <div className="stats-detail">
          <div className="points-card">
            <h2 className="recycling-history">Recycling History</h2><br />
            <b>Largest Deposit:</b> {highestDeposit.amount} 
            {/* display days since last recycle OR how many they've recycled today - depending if they added any entries today */}
            {/* {daysSinceLastRecycle === 0 || isNaN(daysSinceLastRecycle) && daysSinceLastRecycle ? ( ""
              // `You've recycled ${todaysRecycled} ${todaysRecycled == 1 ? "item" : "items"} today!`
            ) : (
              <div>
                <b>Days Since Last Deposit: </b>
                {`${daysSinceLastRecycle} Days`}
              </div>
            )} */}
            <br /><br /><br />

            <RecyclingHistory recyclingHistory={recyclingHistory} /><br />
            You've recycled <b>{yearToDateTotal}</b> items this year<br /><br />


          </div>
        </div>

        <div className="more-points">
          <h3 className="more">WANT TO REDEEM RECYCLEABLES?</h3>
          <br /><button onClick={handlePopup}>{addPopup ? "CLOSE" : "REDEEM"}</button>
          {addPopup &&
            <div className="count-popup">
              <div className="count-buttons">
                <button className="count-button" onClick={() => handleCountChange(1)}>+</button>
                <button className="count-button" onClick={() => handleCountChange(-1)}>-</button>
              </div>
              <button className="redeem-button" onClick={handleSubmit}>REDEEM {count} RECYCLEABLES</button>

            </div>
          }

        </div>
        <br />
      </div>
    </>
  )
}

export default Redeem
