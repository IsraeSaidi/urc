import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import {Login} from "./user/Login";
import { Inscription } from './user/Inscription';
import Messagerie from './principal/messagerie';



function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route path="/messages" element={<Messagerie/>}></Route>
        <Route path="/messages/user/:user_id" element={<Messagerie/>}></Route>
       
      </Routes>
      </BrowserRouter>
  );
}

export default App;
