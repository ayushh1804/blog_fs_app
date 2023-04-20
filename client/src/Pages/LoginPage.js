import React from 'react'
import { Form } from 'react-router-dom'

const LoginPage = () => {
  return (
  <form className='login'>
    <h1>Login</h1>
    <input type="text" placeholder='username' />
    <input type="password" placeholder='password'/>
    <button>Login</button>
  </form>
  )
}

export default LoginPage
