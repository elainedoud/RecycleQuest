import React, { createContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userPoints, setUserPoints] = useState(null)
  const [lastDailyBonus, setLastDailyBonus] = useState(null)
  const [lastDailyQuiz, setLastDailyQuiz] = useState(null)
  const [lastDailyGems, setLastDailyGems] = useState(null)
  const [recyclingHistory, setRecyclingHistory] = useState([])



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
        setUser(data)
        setUserPoints(data.total_points_count)
        setLastDailyBonus(data.last_daily_bonus)
        setLastDailyGems(data.last_gem_bonus)
        console.log(recyclingHistory)
      })
      .catch((error) => {
        // console.error("No user logged in - " 
        // + error)
        setUser(null)
      })
      
  }, [])

  // Return the UserContext Provider with the user and setUser in value
  return (
    <UserContext.Provider value={{ user, setUser, userPoints, setUserPoints, setLastDailyGems, lastDailyGems, lastDailyBonus, setLastDailyBonus, lastDailyQuiz, setLastDailyQuiz, recyclingHistory, setRecyclingHistory  }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext