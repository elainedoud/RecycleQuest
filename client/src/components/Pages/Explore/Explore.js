import React from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import './Explore.css'
import Map from '../Explore/Game/Map/Map'
import Info from '../../Layout/Info/Info'

function Explore({user, setUserPoints, userPoints}) {
    // make this component have an info button that displays the p tag below
    return (
        <>
        <div>
        <Info text={"Gem's are the secret to knowledge! Click around and learn about Recycling, earn points, and even get insights into tomorrow's question of the day!"}/>
        </div>
            {/* <MapInteractionCSS> */}
            <Map user={user} setUserPoints={setUserPoints} userPoints={userPoints}/><br/><br/><br/><br/>
            {/* </MapInteractionCSS> */}

        </>
    )
}

export default Explore