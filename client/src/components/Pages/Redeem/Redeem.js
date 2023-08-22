import React, { useContext, useEffect, useState } from "react"
import "./Redeem.css"
import UserContext from "../../Context/UserContext"
import RecyclingHistory from "./Recycling History/RecyclingHistory"

function Redeem() {
    const recycle = "♻️"
    const [count, setCount] = useState(0)
    const { user } = useContext(UserContext)

    const [recHistory, setRecHistory] = useState([])

    useEffect(() => {
        fetch(`/userlogs?id=${user.id}`)
            .then(r => r.json())
            .then(data => {
                setRecHistory(data)
                console.log(data)
            })
    }, [user.id])

    const handleCountChange = (increment) => {
        if (count + increment >= 0) {
            setCount(prevCount => prevCount + increment)
        }
    }

    // Calculate days since last recycle
    const latestRecycle = recHistory.length > 0
        ? recHistory.reduce((latest, entry) => {
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
    const highestDeposit = recHistory.length > 0
        ? recHistory.reduce((highest, entry) => {
            return entry.amount > highest.amount ? entry : highest
        }, { amount: 0 })
        : { amount: 0 }

    // Calculate year-to-date total
    const currentYear = today.getFullYear()
    const yearToDateTotal = recHistory.reduce((total, entry) => {
        const entryDate = new Date(entry.date)
        if (entryDate.getFullYear() === currentYear) {
            return total + entry.amount
        }
        return total
    }, 0)

    const handleSubmit = () => {
        const currentDate = new Date().toISOString().slice(0, 10)
        const existingEntryIndex = recHistory.findIndex(entry => entry.date === currentDate)
      
        if (existingEntryIndex !== -1) {
            // Update existing entry's amount
            const updatedRecHistory = [...recHistory]
            updatedRecHistory[existingEntryIndex].amount += count
            setRecHistory(updatedRecHistory)
            setCount(0)
        //   fetch('/update-recycle', {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(updatedRecHistory[existingEntryIndex]),
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log('Recycle entry updated:', data)
        //       setRecHistory(updatedRecHistory)
        //       setCount(0)
        //     })
        //     .catch(error => {
        //       console.error('Error updating recycle entry:', error)
        //     })
        } else {
          // Create new entry
          const newRecycle = { date: currentDate, amount: count }
          setRecHistory([...recHistory, newRecycle])
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
        //       setRecHistory([...recHistory, data])
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
                    <b>Highest Deposit:</b> {highestDeposit.amount} <br /><br />
                    <b>Days Since Last Deposit: </b> {daysSinceLastRecycle} Days <br /><br />
                    <b>YTD Recycled:</b> {yearToDateTotal}<br />
                    <RecyclingHistory recHistory={recHistory} />
                </div>
            </div>
            <br />
            <button className="redeem" onClick={handleSubmit}>REDEEM {count} RECYCLEABLES</button> <br />

            <div className="count-buttons">
                <button className="count-button" onClick={() => handleCountChange(1)}>+</button>
                <button className="count-button" onClick={() => handleCountChange(-1)}>-</button>
            </div>

        </div>
    )
}

export default Redeem