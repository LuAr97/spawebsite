import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavbarComponent from './components/Navbar';
import FacialServices from './pages/FacialServices';
import BodyServices from './pages/BodyServices';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/faciales" element={<FacialServices />}/>
          <Route path="/corporales" element={<BodyServices />}/>
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
