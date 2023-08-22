import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import { useState, useContext } from "react"
import AuthCard from "./components/Layout/AuthCard/AuthCard"
import Home from "./components/Pages/Home/Home"
import Explore from "./components/Pages/Explore/Explore"
import Locate from "./components/Pages/Locate/Locate"
import Redeem from "./components/Pages/Redeem/Redeem"
import SubmitLocation from "./components/Pages/SubmitLocation/SubmitLocation"
import Points from "./components/Pages/PointsHistory/Points"
import Leaderboard from "./components/Pages/Leaderboard/Leaderboard"
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import PointsTab from "./components/Layout/Points/PointsTab"
import UserContext from "./components/Context/UserContext"
import Logout from "./components/Layout/Logout/Logout"

import './App.css'

function App() {
  const { user } = useContext(UserContext)

  if (!user) {
    return(
      <div className="App">
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<AuthCard />} />
              <Route path="*" element="Error! Invalid Page." />
            </Routes>
          {/* <Footer /> */}
        </Router>
      </div>)}

  return(
    <div className="App">
      <Router>
        <Header />
        <PointsTab />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="/create/location" element={<SubmitLocation />} />
            <Route path="/redeem" element={<Redeem />}/>
            <Route path="/points" element={<Points />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
          <Logout />
        <Footer />
      </Router>
    </div>
  )
}

export default App
