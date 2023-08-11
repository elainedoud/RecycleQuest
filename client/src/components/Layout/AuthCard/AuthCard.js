import React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import "./AuthCard.css"

function AuthCard(){
  const [signUp, setSignUp] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState(null)

  const handleClick = () => {
    setSignUp((prevState) => !prevState)
  }
  //confirm what post request needs to login
  const handleSubmit = (values) => {
    console.log(values)
    // const url = signUp ? "/signup" : "/login"
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json()
    //     } else {
    //       throw new Error("Invalid credentials")
    //     }
    //   })
    //   .then((data) => {
    //     setUser(data)
    //     navigate(`/`)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //     setErrorMessage("Invalid credentials. Please check your username and password.")
    //     console.log(error.response)
    //   })
  }

  const formSchema = yup.object().shape({
    // username: yup.string().required("Please enter a username."),
    // password: yup.string().required("Please enter a password."),
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className="auth">
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
        <button className="action-button" type="submit">{signUp ? "Sign Up!" : "Log In!"}</button>

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
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: "red" }}>
                {error}
              </h6>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


export default AuthCard
