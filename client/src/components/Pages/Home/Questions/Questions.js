import React, { useState, useEffect, useContext } from "react"
import "./Questions.css"
import UserContext from "../../../Context/UserContext"

function Questions() {
  const { user, userPoints, setUserPoints } = useContext(UserContext)
  
  const [questions, setQuestions] = useState([])

  const [userScore, setUserScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  let score = `${userScore}/${questions.length}`
  let points = userScore * 100

  useEffect(() => {
    fetch("/allquestions")
    .then(r => r.json())
    .then(data => setQuestions(data))
  })

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      let newTotal = userPoints + points
      setUserPoints(newTotal)
      // need structure for post request for persisting points 
        // fetch(`/addPoints/${user.id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log("Points added successfully!");
        //         setUserPoints(newTotal)
        //     } else {
        //         console.error("Failed to add points.");
        //     }
        // });
    }
  }, [currentQuestionIndex, questions.length, userScore]);

  const handleAnswerSelect = (selectedAnswer) => {
    if (!answered) {
      if (selectedAnswer === questions[currentQuestionIndex].answer) {
        setUserScore(userScore + 1)
      }
      setUserAnswer(selectedAnswer)
      setAnswered(true)
    }
  }

  const nextQuestion = () => {
    setAnswered(false)
    setUserAnswer(null)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  return (
    <div className="daily-questions">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="card">
          <h2 className="points-detail">Question {currentQuestionIndex + 1}</h2>
          <p className="query">{questions[currentQuestionIndex].query}</p>
          <div className="options">
            <div
              className={`option ${
                userAnswer === "A" ? "correct-answer" : ""
              }`}
              onClick={() => handleAnswerSelect("A")}
              disabled={answered} // Disable the option if answered
            >
              {questions[currentQuestionIndex].A}
            </div>
            <div
              className={`option ${
                userAnswer === "B" ? "correct-answer" : ""
              }`}
              onClick={() => handleAnswerSelect("B")}
              disabled={answered} // Disable the option if answered
            >
              {questions[currentQuestionIndex].B}
            </div>
            <div
              className={`option ${
                userAnswer === "C" ? "correct-answer" : ""
              }`}
              onClick={() => handleAnswerSelect("C")}
              disabled={answered} // Disable the option if answered
            >
              {questions[currentQuestionIndex].C}
            </div>
          </div>
          {userAnswer !== null && (
            <div>
              {userAnswer === questions[currentQuestionIndex].answer ? (
                <p className="answer">Correct!</p>
              ) : (
                <p className="answer">
                  Wrong! The correct answer is{" "}
                  {questions[currentQuestionIndex].answer}.
                </p>
              )}
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            </div>
          )}
        </div>
      ) : ( 
        <div className="card points"> 
        <p className="redeemable">
          Daily Quiz completed. <br/>
          Your score: {score}<br/>
          Points Eearned: {points}
        </p></div>
      )}
    </div>
  )
}

export default Questions