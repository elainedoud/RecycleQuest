import React from "react"

function Leaderboard({viewPoint}){



    return(
        <div>
                <div>
                    <h4>LEADERBOARD</h4>
                </div>
                <div>
                    <p>{viewPoint.user_id}</p>
                    <p>{viewPoint.count}</p>
                 </div>
                <div>
                    <p>Compare all users to our logged in user and show their ranking</p>
                    <p>Suggest how they can earn more points - links to submit a recycling plant or redeem recyclables</p>
                </div>
        </div>
    )
}
//For some reason, "leadeboard" and notes in <p> are repeating for every user; will want to change this once
// we're pulling the correct information

// get '/allusers', to: "users#show_all"
// first_user = User.create(username: "isabella_mercer", password: "123", emailaddress: "catmomma@gmail.com", dateofbirth: "10-17-1990")
// Just need name and points

export default Leaderboard