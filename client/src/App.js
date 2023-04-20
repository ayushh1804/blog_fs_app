
import './App.css';
import Header from './Header';
import Layout from './Layout';
import Homepage from './Pages/Homepage';
import Post from './Post';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/login' element={
          <div>login page</div>} />
      </Route>
    </Routes>

  );
}

export default App;
