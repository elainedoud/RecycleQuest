import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../Context/UserContext"
import "./Logout.css"

function Logout(){
    const { updateUser } = useContext(UserContext)
    const navigate = useNavigate()
  
    const handleLogout = () => {
      updateUser(null)
      fetch("/logout", {
        method: "DELETE",
      })
        .then(() => {
          navigate(`/`)
        })
        .catch((error) => {
          console.error("Error logging out:", error)
        })
    }
  
    return (
        <div className="logout-tab">
          <button className="no-styling" onClick={handleLogout}>
        Log Out
      </button>  
        </div>
      
    )
  }
  

export default Logout