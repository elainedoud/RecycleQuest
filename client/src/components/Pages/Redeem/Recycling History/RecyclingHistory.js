import React from 'react'

function RecyclingHistory({ recHistory }) {
  return (
    <div className="recycling-history">
      <h2>Recycling History</h2>
      {recHistory && recHistory.map((item, index) => (
         <div key={item.id} className='row-leaderboard'>
         <div className='column1'>{item.date}</div>
         <div className='column2'>{item.amount}</div>
       </div>
      ))}
    </div>
  )
}

export default RecyclingHistory