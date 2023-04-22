import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  {UserContext} from "./UserContext";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext)
  // const [username, setUsername] = useState(null)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);

  const logoutHandler = () => {
   fetch('http://localhost:4000/logout',
      {
        credentials: 'include',
        method:'POST',
      })
      setUserInfo(null);

  }

  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create new Post</Link>
            <a onClick={logoutHandler}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </nav>
    </header>
  )
}