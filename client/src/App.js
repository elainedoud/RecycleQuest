import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import Home from "./components/Pages/Home/Home"
import Explore from "./components/Pages/Explore/Explore"
import Locate from "./components/Pages/Locate/Locate"
import Redeem from "./components/Pages/Redeem/Redeem"
import SubmitLocation from "./components/Pages/SubmitLocation/SubmitLocation"
import Points from "./components/Pages/PointsHistory/Points"
import Leaderboard from "./components/Pages/Leaderboard/Leaderboard"
import AuthCard from "./components/Layout/AuthCard/AuthCard"
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import { useState, useContext } from "react"
import './App.css'
import PointsTab from "./components/Layout/Header/Points/PointsTab"
import UserContext from "./components/Context/UserContext"

function App() {

  
  const [userPoints, setUserPoints] = useState(200)
  const { user } = useContext(UserContext)

  if (!user) {
    return(
      <div className="App">
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<AuthCard />} />
            </Routes>
          {/* <Footer /> */}
        </Router>
      </div>)}


  return(
    <div className="App">
      <Router>
        <Header />
        <PointsTab user={user} userPoints={userPoints}/>
          <Routes>
            <Route path="/home" element={<Home user={user} userPoints={userPoints} setUserPoints={setUserPoints}/>} />
            <Route path="/explore" element={<Explore user={user} setUserPoints={setUserPoints} userPoints={userPoints}/>} />
            <Route path="/locate" element={<Locate userPoints={userPoints} setUserPoints={setUserPoints}/>} />
            <Route path="/create/location" element={<SubmitLocation />} />
            <Route path="/redeem" element={<Redeem user={user} setUserPoints={setUserPoints}/>}/>
            <Route path="/points" element={<Points user={user} setUserPoints={setUserPoints}/>} />
            <Route path="/leaderboard" element={<Leaderboard user={user} userPoints={userPoints}/>} />
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