import React, { useState, useEffect, useContext } from "react"
import UserContext from "../../Context/UserContext"
import './Leaderboard.css'
import Info from "../../Layout/Info/Info"
import {useNavigate } from "react-router-dom"

function Leaderboard() {
  const { user, userPoints } = useContext(UserContext) // Get the currently logged-in user from context

  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/allusers')
      .then(res => res.json())
      .then(usersData => {
        const updatedUsersData = usersData.map(userData => {
          if (userData.id === user.id) {
            // Update the points of the logged-in user
            return { ...userData, total_points_count: userPoints }
          }
          return userData
        });
        const sortedUsers = updatedUsersData.sort((a, b) => b.total_points_count - a.total_points_count)
        setUsers(sortedUsers)
      })
  }, [])

  const leader = users[0] // Get the leader (first user in the sorted list)

  return (
    <>
      <Info text={"Here you can see how you rank amongst the entire RQ Community! Badges will be awarded to users who remain #1 for a week! Have what it takes to be our next Recycle Quest Champion?"} />
      <br /><br />
      
      <div className="leaderboard-container">
        <h2 className="leaderboard">LEADERBOARD</h2>
        {users.map((userboard, index) => (
          <div key={userboard.id} className={`row-leaderboard ${index === 0 ? 'leader' : ''} ${userboard.username === user.username ? 'logged-in' : ''}`}>
            <div className={`column1 ${index === 0 ? 'leader' : ''} ${userboard.username === user.username ? 'logged-in' : ''}`}>{userboard.username}</div>
            <div className={`column2 ${index === 0 ? 'leader' : ''} ${userboard.username === user.username ? 'logged-in' : ''}`}>{userboard.total_points_count}</div>
          </div>
        ))} <br/>
         {leader && userPoints !== leader.total_points_count && (
        <p>You need {leader.total_points_count - userPoints + 1 } points to beat {leader.username}'s #1 Rank!</p>
      )}
      {leader && userPoints === leader.total_points_count && (
        <p>You are #1 in the leaderboards! Congratulations! </p>
      )}

      
      </div> <br/><br/>
        <h3>WANT TO EARN MORE POINTS?</h3>
        <button className="nav-buttons" onClick={() => navigate('/explore')}>Explore </button>
      <button className="nav-buttonson" onClick={() => navigate('/redeem')}> Recycle</button>

    </>
  )
}

export default Leaderboard


