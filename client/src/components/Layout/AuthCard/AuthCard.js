import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import "./AuthCard.css"
import UserContext from "../../Context/UserContext"

function AuthCard() {
  const { updateUser, user } = useContext(UserContext)
  const [signUp, setSignUp] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [loggedIn, setLoggedIn] = useState(Boolean(user))
  const [button, setButton] = useState("Log In!")

  const handleClick = () => {
    setSignUp((prevState) => !prevState)
  }

  const handleSubmit = (values) => {
    if (loggedIn === true) {
      updateUser({})
      fetch("/logout", {
        method: "DELETE",
      })
      setLoggedIn(false)
      navigate(`/`)
    } else {
      const url = signUp ? "/newuser" : "/login"

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error("Invalid credentials")
          }
        })
        .then((data) => {
          updateUser(data)
          setLoggedIn(true) // Set the loggedIn state to true when logged in
          navigate(`/home`)
        })
        .catch((error) => {
          setErrorMessage("Invalid credentials. Please check your username and password.")
          console.log(errorMessage)
        })
    }
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password."),
  })

  const alreadyLoggedIn = yup.object().shape({
    username: "",
    password: "",
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loggedIn ? alreadyLoggedIn : formSchema,
    onSubmit: handleSubmit,
  })

  return (
    <><br /><br />
    <div className="auth comic-border">
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <h4>{signUp ? "Enter your credentials to sign up!" : "Enter your credentials to log in!"}</h4>
        <br />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        {signUp && (
          <>
            <input
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
            {formik.touched.birthday && formik.errors.birthday ? (
              <div>{formik.errors.birthday}</div>
            ) : null}
            <br />
            <br />
          </>
        )}
        <button className="comic-button" type="submit">
          {signUp ? "Sign Up!" : button}
        </button>

        <p className="login">{signUp ? "Already a member?" : "Not a member?"}</p>
        <button className="passive" onClick={handleClick}>
          {signUp ? "Log In!" : "Sign Up!"}
        </button>
        <br />
        <br />
      </form>
      
      {errorMessage && (
        <div className="errors">
          <h6 style={{ color: "red" }}>{errorMessage}</h6>
        </div>
      )}
      {formik.errors && (
        <div className="errors">
          <ul className="errors">
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: "red" }}>
                {error}
              </h6>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  )
}

export default AuthCard