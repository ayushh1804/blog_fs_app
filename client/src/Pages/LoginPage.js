import React,{useState} from 'react'
import { Form } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setredirect] = useState(false);
const loginHandler = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({username,password}),
        headers: {'Content-type': 'application/json'}
    })
}

  return (
  <form className='login' onSubmit={loginHandler}>
    <h1>Login</h1>
    <input type="text" placeholder='username' value={username} onChange={e => setUserName(e.target.value)} />
    <input type="password" placeholder='password' value={password}
    onChange={e=> setPassword(e.target.value)}
    />
    <button>Login</button>
  </form>
  )
}

export default LoginPage
