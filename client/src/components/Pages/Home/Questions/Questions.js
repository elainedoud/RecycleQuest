import React, { useState, useEffect, useContext } from "react"
import "./Questions.css"
import UserContext from "../../../Context/UserContext"
import Countdown from "../Countdown"

function Questions({ timeRemainingQuiz, redeemPointsQuiz, setQuizScores }) {
  const { user, userPoints, setUserPoint, quizPoints, setQuizPoints  } = useContext(UserContext)

  const [questions, setQuestions] = useState([])
  const [userScore, setUserScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  let score = `${userScore}/${questions.length}`
  setQuizPoints(userScore * 100)

  useEffect(() => {
    fetch("/allquestions")
      .then((r) => r.json())
      .then((data) => {
        const shuffledQuestions = data.sort(() => 0.5 - Math.random())
        const randomQuestions = shuffledQuestions.slice(0, 5)
        setQuestions(randomQuestions)
      })
  }, [])

  const checkQuizCompletion = () => {
    if (currentQuestionIndex >= questions.length && questions.length != 0) {
      redeemPointsQuiz(30)
      setQuizScores(userScore, quizPoints)
    }
  }

  useEffect(() => {
    checkQuizCompletion()
  }, [currentQuestionIndex, questions])

  const handleAnswerSelect = (selectedAnswer) => {
    if (!answered) {
      if (selectedAnswer === questions[currentQuestionIndex].answer) {
        setUserScore(userScore + 1)
      }
      setUserAnswer(selectedAnswer)
      setAnswered(true)
      checkQuizCompletion() // Check for quiz completion here
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
          Points Eearned: {quizPoints}
        </p>
        <Countdown timeRemaining={timeRemainingQuiz}/></div>
        
      )}
    </div>
  )
}

export default Questions