import React from "react"
import { Link } from 'react-router-dom' 
import "./Navigation.css"

function Navigation(){
    return(
        <div>
        <ul>
            <li><Link to="/">login</Link><br/></li>
            <li><Link to="/home">home</Link><br/></li>
            <li><Link to="/explore">explore</Link><br/></li>
            <li><Link to="/locate">locate</Link><br/></li>
            <li><Link to="/redeem">redeem</Link><br/></li>
            <li><Link to="/leaderboard">leaderboard</Link></li>
        </ul>
        </div>
    )
}

export default Navigation