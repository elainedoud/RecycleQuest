import React, { useState, useEffect, useContext } from "react"
import './Home.css'
import Countdown from "./Countdown"
import Questions from "./Questions/Questions"
import Info from "../../Layout/Info/Info"
import UserContext from "../../Context/UserContext"

function Home() {
    const { user, userPoints, setUserPoints } = useContext(UserContext)

    const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />
    const [quizStarted, setQuizStarted] = useState(false)

    let lastDailyTime = new Date(Date.parse(user.last_daily_bonus))
    const now = new Date()
    const timeSinceLastDaily = now - lastDailyTime
    const canRedeem = timeSinceLastDaily > 24 * 60 * 60 * 1000
    const [timeRemaining, setTimeRemaining] = useState(canRedeem ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastDaily)
    const [timerStopped, setTimerStopped] = useState(canRedeem)

    useEffect(() =>{
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

    const redeemPoints = (pointsToAdd) => {
        if (canRedeem && user) {
            const newPoints = userPoints + pointsToAdd
            setUserPoints(newPoints)
            user.last_daily_bonus = new Date().toISOString() 
            setTimerStopped(false)
            setTimeRemaining(24 * 60 * 60 * 1000)

        // Elaine to confirm this endpoint
        fetch(`/addPoints/${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // need to add data structure to send points to back end AND update time  
        })
        .then(response => {
            if (response.ok) {
                console.log("Points added successfully!");
                user.total_points = user.total_points += pointsToAdd;
            } else {
                console.error("Failed to add points.");
            }
        });
        }

    }

    return (
        <div>
            <Info text={"Daily bonus can be redeemed once every 24 hours. Daily questions refresh every 24 hours and are based on knowledge collected from yesterday's gems quest."}/>
            
            <div className="daily-points">
                {!canRedeem ? (
                    <div className="redeem-status">
                        <Countdown timeRemaining={timeRemaining} />
                    </div>
                ) : (
                    <div className="redeem-status">
                        <b>Today's Daily Bonus:</b> 100 {gem}<br />
                        {/* You can add any additional content or formatting here */}
                    </div>
                )}
                {canRedeem && (
                    <button className="daily-question" onClick={() => redeemPoints(100)}>REDEEM DAILY BONUS</button>
                )}
            </div>

            {!quizStarted && (
                <button className="daily-question" onClick={() => setQuizStarted(true)}>Start Today's Quiz</button>
            )}
            {quizStarted && (
                <div className="daily-questions"> 
                    <Questions />
                </div>
            )}
        </div>
    )
}

export default Home