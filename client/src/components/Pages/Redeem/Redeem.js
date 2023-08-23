import React, { useContext, useEffect, useState } from "react"
import "./Redeem.css"
import UserContext from "../../Context/UserContext"
import RecyclingHistory from "./Recycling History/RecyclingHistory"

function Redeem() {
  const recycle = "♻️"
  const [count, setCount] = useState(0)
  const { user, setRecyclingHistory, recyclingHistory } = useContext(UserContext)
  const [addPopup, setAddPopup] = useState(false)

  useEffect(() => {
    fetch(`/userlogs?id=${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (recyclingHistory.length <= 0) {
          setRecyclingHistory(data)
          console.log(data)
        }
      })
  }, [user.id])

  const handlePopup = () => {
    setAddPopup(!addPopup)
  }

  const handleCountChange = (increment) => {
    if (count + increment >= 0) {
      setCount((prevCount) => prevCount + increment)
    }
  }

  // Calculate days since last recycle
  const latestRecycle = recyclingHistory.length > 0
    ? recyclingHistory.reduce((latest, entry) => {
        const entryDate = new Date(entry.date)
        if (!latest || entryDate > latest.date) {
          return { date: entryDate, amount: entry.amount }
        }
        return latest
      }, null)
    : null

  const today = new Date()
  const daysSinceLastRecycle = latestRecycle
    ? Math.floor((today - latestRecycle.date) / (1000 * 60 * 60 * 24))
    : 0

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

  const handleSubmit = () => {
    console.log("you've hit handleSubmit")
    const currentDate = new Date().toISOString().slice(0, 10)
    const existingEntryIndex = recyclingHistory.findIndex(
      (entry) => entry.date === currentDate
    )

    if (existingEntryIndex !== -1) {
      // Update existing entry's amount
      const updatedRecHistory = [...recyclingHistory]
      updatedRecHistory[existingEntryIndex].amount += count
      setRecyclingHistory(updatedRecHistory)
      setCount(0)
    } else {
      // Create new entry
      const newRecycle = { date: currentDate, amount: count }
      setRecyclingHistory([...recyclingHistory, newRecycle])
      setCount(0)

        //   fetch('/addrecycle', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newRecycle),
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log('New recycle entry added:', data)
        //       setRecyclingHistory([...recyclingHistory, data])
        //       setCount(0)
        //     })
        //     .catch(error => {
        //       console.error('Error adding recycle entry:', error)
        //     })
    }
  }

  return (
    <div className="recyclopoints">
      <div className="stats-detail">
        <div className="points-card">
          <h2 className="recycling-history">Recycling History</h2><br />
          <b>Largest Deposit:</b> {highestDeposit.amount} <br /><br />
          <b>Days Since Last Deposit: </b>
          {daysSinceLastRecycle === 0
            ? `You've recycled ${count} today!`
            : `${daysSinceLastRecycle} Days`}
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
    <br/>
    </div>
  )
}

export default Redeem