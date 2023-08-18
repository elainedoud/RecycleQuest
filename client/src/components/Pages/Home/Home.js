import React, { useState, useEffect } from "react"
import './Home.css'
import AuthCard from "../../Layout/AuthCard/AuthCard"

function Home({ user }) {
    let points = {
        total_points: "200",
        last_daily: "2023-08-17T11:05:25.381Z"
    }

    const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />

    const lastDailyTime = new Date(Date.parse(points.last_daily))
    const now = new Date()
    const timeSinceLastDaily = now - lastDailyTime

    const canRedeem = timeSinceLastDaily > 24 * 60 * 60 * 1000 // Less than 24 hours in milliseconds

    const [timeRemaining, setTimeRemaining] = useState(canRedeem ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastDaily)
    const [timerStopped, setTimerStopped] = useState(canRedeem)

    useEffect(() => {
        if (!timerStopped && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1000) {
                        setTimerStopped(true)
                        clearInterval(interval)
                        return 0
                    }
                    return prevTime - 1000
                })
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [timeRemaining, timerStopped])

    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    return (
        <div className="daily-points">
            <p className="points-detail">
                <div className="points-card">
                    <b>Current Points :</b> {points.total_points} {gem} <br /><br />
                    <b>Today's Daily Bonus :</b> 100 {gem}<br /><br />

                    {!canRedeem && <div>
                    <p className="redeemable">You must wait {hoursRemaining} hours, {minutesRemaining} minutes, and {secondsRemaining} seconds for your next bonus!</p>
                </div>}
                </div>
                
            </p>
            {canRedeem && (
                <button className="redeem">REDEEM DAILY BONUS</button>
            )}
        </div>
    )
}

export default Home
