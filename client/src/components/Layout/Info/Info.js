import React, { useState } from "react"
import InfoIcon from './info-icon.png'
import "./Info.css"

function Info({text}) {
    const [showPopup, setShowPopup] = useState(false)
    const icon = InfoIcon
    
    
    const togglePopup = () => {
        setShowPopup(!showPopup)
        console.log("toggle")
    }

    return (
        <div className="info-container">
            <img
                className="info-icon"
                src={icon}
                alt="Info Icon"
                style={{ cursor: 'pointer' }}
                onClick={togglePopup}
            /> <br/>
            {showPopup && (
                <div className="info-popup">
                    {text}
                </div>
            )}
        </div>
    )
}

export default Info