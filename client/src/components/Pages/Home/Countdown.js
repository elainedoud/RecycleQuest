import React from "react"

function Countdown({ timeRemaining }) {
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    return (
        <div>
            <p className="redeemable">
                Next bonus available in {hoursRemaining} hours, {minutesRemaining} minutes, and {secondsRemaining} seconds!
            </p>
        </div>
    )
}

export default Countdown