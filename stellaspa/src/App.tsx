import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavbarComponent from './components/Navbar';
import FacialServices from './pages/FacialServices';
function App() {
  
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/faciales" element={<FacialServices />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
