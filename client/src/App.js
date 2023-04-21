
import './App.css';
import Header from './Header';
import Layout from './Layout';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Post from './Post';
import { Routes, Route } from "react-router-dom";
import { UsercontextProvider } from './UserContext';
function App() {
  return (
    <UsercontextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Route>
    </Routes>
    </UsercontextProvider>

  );
}

export default App;
