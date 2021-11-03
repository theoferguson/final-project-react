import './App.css';
import { useState, useEffect } from 'react';
import Login from 'Login';
import Navbar from 'Navbar';
import SignUp from 'SignUp';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [issueRequest, setIssueRequest] = useState(false)

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, [issueRequest]);



  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  if (user) {
    return (
      <Navbar onLogout={setUser} />
    );
  } else {
    return (
      <>
        <Login onLogin={setUser} />
        <SignUp onLogin={setUser} />
      </>
    );
  }
}

export default App;
