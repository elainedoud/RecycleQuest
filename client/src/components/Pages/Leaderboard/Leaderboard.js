import React from "react"
import { useState, useEffect } from "react"

function Leaderboard(){

    const [viewPoints, setViewPoints] = useState([])

    useEffect(() =>{
      fetch('/leaderboard')
      .then (res => res.json())
      .then(viewPoints => setViewPoints(viewPoints))
    })

    return(
        <div>
                <div>
                    <h4>LEADERBOARD</h4>
                </div>
                {viewPoints.map(viewPoint =>{
                    return <div key={viewPoint.id} viewPoint={viewPoint}>
                            <p>{viewPoint.username}</p>
                            <p>{viewPoint.count*2}</p>
                    </div>
                })}
                <div>
                    <p>Compare all users to our logged in user and show their ranking</p>
                    <p>Suggest how they can earn more points - links to submit a recycling plant or redeem recyclables</p>
                </div>
        </div>
    )
}
//For some reason, "leadeboard" and notes in <p> are repeating for every user; will want to change this once
// we're pulling the correct information

export default Leaderboard