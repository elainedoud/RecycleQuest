import React, { createContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userPoints, setUserPoints] = useState(null)
  const [lastDailyBonus, setLastDailyBonus] = useState(null)
  // const [lastDailyQuiz, setLastDailyQuiz] = useState(null)
  const [lastDailyGems, setLastDailyGems] = useState(null)
  
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
        // setLastDailyBonus(user.last_daily_bonus)
        // setLastDailyGems(user.last_daily_gems)
        // console.log(data) // Set the fetched user data
        
        
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
        setUser(null)
      })
  }, [])

  

  // Return the UserContext Provider with the user and setUser in value
  return (
    <UserContext.Provider value={{ user, setUser, userPoints, setUserPoints }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext