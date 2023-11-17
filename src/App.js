import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import {Login} from "./user/Login";
import { Inscription } from './user/Inscription';

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
