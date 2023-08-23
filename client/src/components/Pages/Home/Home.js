import React, { useState, useEffect, useContext } from "react"
import './Home.css'
import Countdown from "./Countdown"
import Questions from "./Questions/Questions"
import Info from "../../Layout/Info/Info"
import UserContext from "../../Context/UserContext"

function Home() {
    const { user, 
        userPoints, 
        setUserPoints, 
        lastDailyBonus, 
        setLastDailyBonus, 
        lastDailyQuiz, 
        setLastDailyQuiz, 
        remainingTimeBonus, 
        setRemainingTimeBonus, 
        remainingTimeQuiz, 
        setRemainingTimeQuiz,
        quizCompleted, 
        setQuizCompleted, 
        quizPoints, 
        setQuizPoints,
        updatePoints   } = useContext(UserContext)
    // console.log(user)
    // console.log(lastDailyQuiz)
   

    const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem" />
    const [quizStarted, setQuizStarted] = useState(false)

    // time calculations for daily bonus 
    const lastDailyTime = new Date(Date.parse(user.last_daily_bonus))
    const now = new Date()
    const timeSinceLastDaily = now - lastDailyTime
    const canRedeem = timeSinceLastDaily > 24 * 60 * 60 * 1000
    const [timeRemaining, setTimeRemaining] = useState(canRedeem ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastDaily)
    const [timerStopped, setTimerStopped] = useState(canRedeem)
    
    // time calculations for daily quiz 
    const lastQuizTime = new Date(Date.parse(user.last_daily_question))
    const timeSinceLastQuiz = now - lastQuizTime
    const canRedeemQuiz = timeSinceLastQuiz > 24 * 60 * 60 * 1000
    const [timeRemainingQuiz, setTimeRemainingQuiz] = useState(canRedeemQuiz ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastQuiz)
    const [timerStoppedQuiz, setTimerStoppedQuiz] = useState(canRedeemQuiz)


    // console.log("last quiz time: " + lastQuizTime)
    // console.log("time since last quiz: " + timeSinceLastQuiz)
    // console.log("can redeem quiz: " + canRedeemQuiz)
    // console.log("time remaining quiz: " + timeRemainingQuiz)
    // console.log("timer stopped quiz: " + timerStoppedQuiz)
    // console.log("quiz completed: " + quizCompleted)
    // const [timeRemainingQuiz, setTimeRemainingQuiz] = useState(canRedeemQuiz ? 0 : 24 * 60 * 60 * 1000 - timeSinceLastQuiz)

    // useEffect for daily bonus 
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

    // useEffect for daily quiz
    useEffect(() =>{
        if (!timerStoppedQuiz && timeRemainingQuiz > 0) {
            const interval = setInterval(() => {
                setTimeRemainingQuiz(prevTime => {
                    if (prevTime <= 1000) {
                        setTimerStoppedQuiz(true)
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
    }, [timeRemainingQuiz, timerStoppedQuiz])

    // update points for daily bonus
    const redeemPoints = (pointsToAdd) => {
        if (canRedeem && user) {
            const newPoints = userPoints + pointsToAdd
            setUserPoints(newPoints)
            user.last_daily_bonus = new Date().toISOString() 
            setLastDailyBonus()
            setTimerStopped(false)
            setTimeRemaining(24 * 60 * 60 * 1000)
            updatePoints("daily_bonus", pointsToAdd)
          }
    }

    // update points for daily quiz
    const redeemPointsQuiz = (pointsToAdd) => {
        if (canRedeemQuiz && user) {
            const newPoints = userPoints + pointsToAdd
            setUserPoints(newPoints)
            user.last_daily_question = new Date().toISOString() 
            setLastDailyQuiz(new Date().toISOString())
            setTimerStoppedQuiz(false)
            setTimeRemainingQuiz(24 * 60 * 60 * 1000)
            setQuizCompleted(true)
            setQuizPoints(pointsToAdd)
            updatePoints("daily_quiz", pointsToAdd)
        }
    }


    const [score, setScore] = useState(quizPoints/100)
    const [points, setPoints] = useState(null)
    const setQuizScores = (quizscore, totalquestionCount) => {
        setScore(quizscore)
        setPoints(totalquestionCount)
    }

    return (
        <div>
            <Info text={"Daily bonus can be redeemed once every 24 hours. Daily questions refresh every 24 hours and are based on knowledge collected from yesterday's gems quest."}/>

            <br/><br/><br/>

            {!quizStarted && canRedeemQuiz && !quizCompleted && (
                <button className="daily-question" onClick={() => setQuizStarted(true)}>Start Today's Quiz</button>
            )}

            {quizStarted && !quizCompleted && (
                <div className="daily-questions">
                    <Questions
                        timeRemainingQuiz={timeRemainingQuiz}
                        redeemPointsQuiz={redeemPointsQuiz}
                        setQuizScores={setQuizScores}
                    />
                </div>
            )}

            {quizCompleted && (
                <div className="redeem-status">

                    <p className="redeemable">
                    Daily Quiz completed. <br/>
                    Your score: {score}<br/>
                    Points Eearned: {quizPoints}
                    </p>

                    <Countdown type={"quiz"} timeRemaining={timeRemainingQuiz} />

                    <div className="daily-points">
                {!canRedeem ? (
                    <div className="redeem-status">
                        <Countdown timeRemaining={timeRemaining} type={"daily bonus"}/>
                    </div>
                ) : (
                    <div className="redeem-status">
                        <b>Today's Daily Bonus:</b> 100 {gem}<br />
                        {/* You can add any additional content or formatting here */}
                    </div>
                )}
                {canRedeem && (

                    <button className="daily-question-button" onClick={() => redeemPoints(100)}>REDEEM DAILY BONUS</button>
                )}
            </div>
                    {/* Display user's quiz score */}
                </div>
            )}
        </div>
    )
}

export default Home