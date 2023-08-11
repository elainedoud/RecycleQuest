import React from "react"
import map from './map_sprite_sheet.png'
import "./Explore.css"

function Explore(){
    return(
        <>
        <p>Here users can learn by exploring our village!</p>
        <p>Coming Soon! Map Pieces below for color pallete match:</p>
        <img src={map} alt="map sprite sheet"/>
        </>
    )
}

export default Explore
