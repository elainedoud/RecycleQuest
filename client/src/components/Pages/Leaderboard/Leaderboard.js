import React from "react"
import { useState, useEffect } from "react"
import './Leaderboard.css'
import Info from "../../Layout/Info/Info"

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
    <>
    <Info text={"Here you can see how you rank amongst the entire RQ Community! Badges will be awarded to users who remain #1 for a week! Have what it takes to be our next Recycle Quest Champion?"}/>
        <br/><br/>
        <div className="leaderboard-container">
           
                {sortedPoints.map((sortedPoint, index) =>{
                    return (
                        <div key={sortedPoint.id} sortedPoint={sortedPoint} className={`row-leaderboard ${index === 0 ? 'leader' : ''}`}>
                             <div className={`column1 ${index === 0 ? 'leader' : ''}`}>{sortedPoint.username}</div>    
                             <div className={`column2 ${index === 0 ? 'leader' : ''}`}>{sortedPoint.count*2}</div>
                        </div>
                )})}
                
        </div>
        </>
    )
}

export default Leaderboard