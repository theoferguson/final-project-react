import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import SignUp from './SignUp';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [issueRequest, setIssueRequest] = useState(false)
  const [marketplace, setMarketplace] = useState([])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, [issueRequest]);

  useEffect(() => {
    fetch("/posts")
        .then((r) => r.json())
        .then((json) => {
            setMarketplace(json)
        })
}, [issueRequest]);

  function onLogin(user) {
    if (user.username) {
      setUser(user)
      setIssueRequest(!issueRequest)
    } else {
      console.log(user)
    }
  };

  function onSignUp(user) {
    if (user.username) {
      setUser(user)
      setIssueRequest(!issueRequest)
    } else {
      console.log(user)
    }
  };

  function onLogout() {
    setUser(null)
  };

  if (user) {
    return (
      <Router>
        <Navbar 
        onLogout={onLogout} 
        user={user} 
        setUser={setUser} 
        marketplace={marketplace} 
        issueRequest={issueRequest} 
        setIssueRequest={setIssueRequest}
        />
      </Router>
    );
  } else {
    return (
      <>
        <Login onLogin={onLogin} />
        <SignUp onSignUp={onSignUp} />
      </>
    );
  }
}

export default App;
