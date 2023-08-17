import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import { useState, useEffect } from "react"
import Navigation from "./components/Layout/Footer/Navigation/Navigation"
import Home from "./components/Pages/Home/Home"
import Explore from "./components/Pages/Explore/Explore"
import Locate from "./components/Pages/Locate/Locate"
import Redeem from "./components/Pages/Redeem/Redeem"
import SubmitLocation from "./components/Pages/SubmitLocation/SubmitLocation"
import Points from "./components/Pages/Points/Points"
import Leaderboard from "./components/Pages/Leaderboard/Leaderboard"
import AuthCard from "./components/Layout/AuthCard/AuthCard"
import './App.css'
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"

function App() {

  const [viewPoints, setViewPoints] = useState([])

  useEffect(() =>{
    fetch('/allpoints')
    .then (res => res.json())
    .then(viewPoints => setViewPoints(viewPoints))
    console.log((viewPoints))
  })

  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route path="/login" element={<AuthCard/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="/create/location" element={<SubmitLocation />} />
            <Route path="/redeem" element={<Redeem />}/>
            <Route path="/points" element={<Points />} />
            <Route path="/leaderboard" element={
            <div>
              {viewPoints.map(viewPoint => {
                return <Leaderboard key={viewPoint.id} viewPoint={viewPoint}/> 
              })}
              </div>} />
          </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

 /* To pull in information from the backend

  get '/oneknowledge'  To get a question by its id
  get '/allknowledge'  To get all the questions

  get '/onelocation'   To get a location by its id
  get '/alllocations'  To get all the locations

  post '/assignpoints' To assign points when answer is correct
  (The ruby code for assigning points made need to be revised)

  get '/userpoints'    To get/show a user's points
  get '/allpoints'    To show all points for all users

  get '/question'   To show a question by its id
  get '/allquestions'  To show all questions

  get '/user'   To show a user by their id
  get '/allusers'  To show all the users
  post '/newuser'  To add a user
 
  post '/login'  To login a user (create session)
  delete '/logout'  To logout a user (delete session)
 
 */