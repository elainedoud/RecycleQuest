import { useState, useEffect} from "react";
import './App.css';

function App() {

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

  return (
    <div className="App">
      <h1>Recycle Quest</h1>
    </div>
  );
}

export default App;
