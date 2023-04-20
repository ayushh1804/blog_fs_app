
import './App.css';
import Header from './Header';
import Post from './Post';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path='/' element={
        <main>
          <Header />
          <Post />
          <Post />
          <Post />
        </main>
      } />
    </Routes>

  );
}

export default App;
