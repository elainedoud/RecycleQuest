import React from "react"
import './Home.css'
import AuthCard from "../../Layout/AuthCard/AuthCard"

function Home(){
    const user = "Tester"

    const gem = <img src="https://freepngimg.com/save/56561-gem-download-hq-png/554x361" className="gems" alt="green-gem"/>

    return(
        <div className="daily-points">
        <p className="points-detail">
            <div className="points-card"> 
            
                <b>Current Points :</b> 200 {gem} <br/><br/>
                <b>Today's Daily Bonus :</b> 100 {gem}<br/><br/>
                <b>Daily Bonus Streak :</b> 3 days <br/><br/>
                <b>Next Bonus :</b> 24:01:26 hrs <br/><br/>
            
            </div>        
        </p>

        <button className="redeem">REDEEM DAILY BONUS</button>
        <p>Redeem your daily points so you don't lose your streak!</p><br/>

        <p className="text">You haven't checked-in today!</p>
       
        </div>

    )
}

export default Home