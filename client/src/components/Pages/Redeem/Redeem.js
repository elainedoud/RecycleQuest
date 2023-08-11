import React from "react"
import "./Redeem.css"

function Redeem(){
    const recycle = "♻️"
    return(
        <div className="recyclopoints">      
        <p className="stats-detail">
            <div className="points-card"> 
                <b>Highest Score:</b> 12 {recycle} <br/><br/>
                <b>Days Since Last Recycle</b> 3 <br/><br/>
                <b>YTD Recycled:</b> 487 {recycle}<br/><br/>
            </div>        
        </p>
        
        <button className="redeem">REDEEM RECYCLE</button> <br/><br/><br/>
        <p className="text">You haven't recycled today!</p>
        </div>
    )
}

export default Redeem