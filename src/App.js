import './App.css';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to='home'></Navigate>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/details/:id" element={<div>Details</div>}></Route>
    </Routes>
  );
}

export default App;
