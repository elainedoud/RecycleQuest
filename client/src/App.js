import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Explore from "./components/Explore"
import Locate from "./components/Locate"
import Redeem from "./components/Redeem"
import SubmitLocation from "./components/SubmitLocation"
import Points from "./components/Points"
import Leaderboard from "./components/Leaderboard"
import AuthCard from "./components/AuthCard"

function App() {

  return (
    <div className="App">
      <h1>Recycle Quest</h1>
      <Router>
        <Navigation />
        <AuthCard />
        ___
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="/create/location" element={<SubmitLocation />} />
            <Route path="/redeem" element={<Redeem />}/>
            <Route path="/points" element={<Points />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
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