import React, {useState} from "react"
import "./Redeem.css"

function Redeem(){
    const recycle = "♻️"
    const [count, setCount] = useState(0)

    const handleCountChange = (increment) => {

        if(count+increment >= 0){
            setCount(prevCount => prevCount + increment);
        }
        
      }

    const handleSubmit = (values) => {
        //fetch request here to persist data to db
        setCount(0)
    }
    return(
        <div className="recyclopoints">      
            <p className="stats-detail">
                <div className="points-card"> 
                    <b>Highest Deposit:</b> 12 {recycle} <br/><br/>
                    <b>Days Since Last Deposit: </b> 3 Days <br/><br/>
                    <b>YTD Recycled:</b> 487 {recycle}<br/>
                </div>        
            </p>

            <button className="redeem" onClick={handleSubmit}>REDEEM {count} RECYCLEABLES</button> <br/>

            <div className="count-buttons">
                <button className="count-button" onClick={() => handleCountChange(1)}>+</button>
                <button className="count-button" onClick={() => handleCountChange(-1)}>-</button>
            </div>
            
        </div>
    )
}

export default Redeem