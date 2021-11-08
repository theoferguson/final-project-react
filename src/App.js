import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import SignUp from './SignUp';

function App() {
  const [user, setUser] = useState(null);
  const [issueRequest, setIssueRequest] = useState(false)

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, [issueRequest]);

  function onLogin(user) {
    if (user.username) {
      setUser(user)
    }
  }

  function onLogout() {
    setUser(null)
  }

  if (user) {
    return (
      <Navbar onLogout={onLogout} />
    );
  } else {
    return (
      <>
        <Login onLogin={onLogin} />
        <SignUp onLogin={onLogin} />
      </>
    );
  }
}

export default App;
