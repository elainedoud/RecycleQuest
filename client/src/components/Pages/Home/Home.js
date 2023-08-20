import React, { useState, useEffect } from "react"
import './Home.css'
import AuthCard from "../../Layout/AuthCard/AuthCard"
import Countdown from "./Countdown"
import Questions from "./Questions/Questions"
import Info from "../../Layout/Info/Info"

function Home({ user, userPoints, setUserPoints }) {
    const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />

    // logic and variables for points and timer
    const [points, setPoints] = useState({
        total_points: userPoints,
        last_daily: "2023-08-14T11:05:25.381Z"
    })
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

    // calculate exact time remaining for display
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    // post request tbd but temp state point update & timer reset
    const redeemPoints = (pointsToAdd) => {
        if (canRedeem && user) {
            setPoints(prevPoints => ({
                ...prevPoints,
                total_points: prevPoints.total_points + pointsToAdd,
                last_daily: new Date().toISOString() // Update last_daily to the current time in ISO format
            }))
            setUserPoints(userPoints + pointsToAdd)
            setTimerStopped(false) // Restart the timer
            setTimeRemaining(24 * 60 * 60 * 1000) // Set timeRemaining to 24 hours in milliseconds
        }

        // fetch(`/addPoints/${userId}/${pointsToAdd}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log("Points added successfully!");
        //         points.total_points = points.total_points += pointsToAdd;
        //     } else {
        //         console.error("Failed to add points.");
        //     }
        // });
    }

    return (
        <div>
            <Info text={"Daily bonus can be redeemed once every 24 hours. Daily questions refresh every 24 hours and are based on knowledge collected from yesterday's gems quest."}/>
            <div className="daily-points">
            <p className="points-detail">
                <div className="points-card">
                    <b>Current Points :</b> {userPoints} {gem} <br /><br />
                    <b>Today's Daily Bonus :</b> 100 {gem}<br /><br />
                    {!canRedeem && <Countdown timeRemaining={timeRemaining} />} 
                </div>
            </p>
            {canRedeem && (
                <button className="redeem" onClick={() => redeemPoints(100)}>REDEEM DAILY BONUS</button>
            )}
            </div>

            <div className="daily-questions"> 
            <Questions setUserPoints={setUserPoints} userPoints={userPoints}/>
            </div>
        </div>
    )
}

export default Home