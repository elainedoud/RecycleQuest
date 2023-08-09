import React from "react"
import { Link } from 'react-router-dom' 

function Navigation(){
    return(
        <div>
        <Link to="/">home</Link><br/>
        <Link to="/explore">explore</Link><br/>
        <Link to="/locate">locate</Link><br/>
        <Link to="/create/location">submit</Link><br/>
        <Link to="/redeem">redeem</Link><br/>
        <Link to="/points">points</Link><br/>
        <Link to="/leaderboard">leaderboard</Link>
        </div>
    )
}

export default Navigation