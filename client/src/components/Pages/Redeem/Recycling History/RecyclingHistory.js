import React from 'react'
import './RecyclingHistory.css'

function RecyclingHistory({ recyclingHistory }) {
  return (
    <div key={"recycling-history"}className="recycling-history">
      
      {recyclingHistory && recyclingHistory.map((item, index) => (
         <div key={item.index} className='row-leaderboard'>
         <div key={item.index + "2"} className='column1'>{item.date}</div>
         <div key={item.index + "3"} className='column2'>{item.amount}</div>
       </div>
      ))}
    </div>
  )
}

export default RecyclingHistory