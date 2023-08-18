import React from 'react'
import { MapInteractionCSS } from 'react-map-interaction'
import './Explore.css'
import Map from '../Explore/Game/Map'

function Explore() {
    // make this component have an info button that displays the p tag below
    return (
        <>
            <p>Gem's are the secret to knowledge! <br/> <i>Click around and learn about Recycling, earn points, and even get insights into tomorrow's question of the day!</i> </p>
            <MapInteractionCSS>
            <Map /><br/><br/><br/><br/>
            </MapInteractionCSS>

        </>
    )
}

export default Explore