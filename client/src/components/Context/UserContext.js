import React, { createContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userPoints, setUserPoints] = useState(null)
  const [lastDailyBonus, setLastDailyBonus] = useState(null)
  const [lastDailyQuiz, setLastDailyQuiz] = useState(null)
  const [lastDailyGems, setLastDailyGems] = useState(null)
  const [recyclingHistory, setRecyclingHistory] = useState([])
  const [locations, setLocations] = useState([])
  const [remainingTimeBonus, setRemainingTimeBonus] = useState(0)
  const [remainingTimeQuiz, setRemainingTimeQuiz] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizPoints, setQuizPoints] = useState(null)
  const [gemsCollected, setGemsCollected] = useState(false)
  const [collectedKnowledge, setCollectedKnowledge] = useState(user ? user.collected_knowledge : []);

  console.log(gemsCollected)
  //authenticate user based on backend session
  useEffect(() => {
    fetch("/user")
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          setUser(null)
        }
      })
      .then((data) => {
        // data.last_daily_question = "023-08-20T18:55:00.000Z"
        setUser(data)
        // console.log(data)
        setUserPoints(data.total_points_count)
        const testTime = "023-08-20T18:55:00.000Z"
        setLastDailyBonus(testTime)
        setLastDailyQuiz(testTime)
        setLastDailyGems(testTime)
        // console.log(recyclingHistory)
      })
      .catch((error) => {
        // console.error("No user logged in - " 
        // + error)
        setUser(null)
      })
      
  }, [])

  // Return the UserContext Provider with the user and setUser in value
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      userPoints, 
      setUserPoints, 
      setLastDailyGems, 
      lastDailyGems, 
      lastDailyBonus, 
      setLastDailyBonus, 
      lastDailyQuiz, 
      setLastDailyQuiz, 
      recyclingHistory, 
      setRecyclingHistory, 
      locations, 
      setLocations, 
      remainingTimeBonus, 
      setRemainingTimeBonus, 
      remainingTimeQuiz, 
      setRemainingTimeQuiz,
      quizCompleted, 
      setQuizCompleted,
      quizPoints, 
      setQuizPoints,
      gemsCollected, 
      setGemsCollected,
      collectedKnowledge, 
      setCollectedKnowledge
      }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

