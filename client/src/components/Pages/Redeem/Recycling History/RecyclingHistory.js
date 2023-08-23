import React from 'react'
import './RecyclingHistory.css'

function RecyclingHistory({ recyclingHistory }) {
  return (
    <div className="recycling-history">
      
      {recyclingHistory && recyclingHistory.map((item, index) => (
         <div key={item.index} className='row-leaderboard'>
         <div className='column1'>{item.date}</div>
         <div className='column2'>{item.amount}</div>
       </div>
      ))}
    </div>
  )
}

export default RecyclingHistory