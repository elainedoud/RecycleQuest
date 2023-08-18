import React from "react"
import { useState, useEffect } from "react"

function Leaderboard(){

    const [viewPoints, setViewPoints] = useState([])
    const [sortedPoints, setSortedPoints] = useState([])

    useEffect(() =>{
      fetch('/leaderboard')
      .then (res => res.json())
      .then(viewPoints => {
        setViewPoints(viewPoints)
        const sortedPoints = viewPoints.sort((a,b) => b.count - a.count)
        setSortedPoints(sortedPoints)
      })
    }, [])
    
    
    return(
        <div>
                <div>
                    <h4>LEADERBOARD</h4>
                </div>
                {sortedPoints.map(sortedPoint =>{
                    return <div key={sortedPoint.id} sortedPoint={sortedPoint}>
                             <div class="column1">{sortedPoint.username}</div>    
                             <div class="column2">{sortedPoint.count*2}</div>
                        </div>
                })}
                <div>
                    <p>Suggest how they can earn more points - links to submit a recycling plant or redeem recyclables</p>
                </div>
        </div>
    )
}

export default Leaderboard