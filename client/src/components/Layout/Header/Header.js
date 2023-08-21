import React from "react"
import "./Header.css"
import logo from "./RecycleQuestLogo.png"

function Header(){
    return(
        <div className="header">
            <img src={logo} alt="Recycle Quest Logo" className="logo"/> 
            {/* <h1>RECYCLE QUEST</h1> */}
        </div>
    )
}

export default Header
