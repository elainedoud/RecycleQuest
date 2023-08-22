import React, { useState } from "react"
import infoIcon from './info-icon.png'
import "./Info.css"

function Info({text}) {
    const [showPopup, setShowPopup] = useState(false)
        
    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    return (
        <div className="info-container">
            <img
                className="info-icon"
                src={infoIcon}
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