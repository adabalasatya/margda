import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import { Login } from './Pages/Login';
import { Sign }  from './Pages/Signup'
import  Dashboard  from './Pages/Dashboard'



function App() {
  
  return (
    <>
       <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>  
    
    </>

  );
}

export default App;